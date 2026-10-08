import type { ReactNode } from "react";
import type { WorkSectionId } from "@/lib/work-sections";

/**
 * One of a project page's five fixed sections (brief section 9). `id`
 * matches `workSectionIds` so the table of contents can link and
 * scroll-spy against it. `title` is resolved by the caller (the page
 * component, from messages/en.json) rather than looked up here, so this
 * stays a plain, translation-agnostic component that MDX can render
 * directly.
 *
 * Heading is h2, not h3: these are the direct children of the page's h1
 * (the project title), so h2 is the correct next level. An earlier version
 * used h3 here, which skipped a level in the document outline — the
 * heading's visual size (text-h3, 20px) is independent of which tag it is.
 *
 * Each title sits on a dotted rule rather than the solid hairline used
 * elsewhere (spec block rows, the gallery divider) — same `--line` color
 * and still brief section 3's "hairline rule as structural device," just a
 * visibly softer/quieter variant for separating a section's title from its
 * own body, distinct from the firmer rules around data (spec block, tags).
 */
export function Section({
  id,
  title,
  children,
}: {
  id: WorkSectionId;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-32">
      <h2 className="border-line border-b border-dotted pb-3 font-head text-h3 font-semibold text-ink">
        {title}
      </h2>
      {/* Tailwind's preflight zeroes margin on every block element
       * (paragraphs, lists, headings), so MDX's own paragraph/list breaks
       * render with no visible gap unless something restores it. This
       * spaces any block-level child (p, ul, a Figure, ProjectModel, Note,
       * ...) from whatever precedes it, at the brief's 16px step. */}
      <div className="mt-3 max-w-prose text-body text-ink [&>*+*]:mt-4">
        {children}
      </div>
    </section>
  );
}
