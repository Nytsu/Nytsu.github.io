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
    <section id={id} className="scroll-mt-32">
      <h2 className="mt-10 font-head text-h3 font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-3 max-w-prose text-body text-ink">{children}</div>
    </section>
  );
}
