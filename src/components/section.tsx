import type { ReactNode } from "react";
import type { WorkSectionId } from "@/lib/work-sections";

/**
 * One of a project page's five fixed sections (brief section 9). `id`
 * matches `workSectionIds` so the table of contents can link and
 * scroll-spy against it. `title` is resolved by the caller (the page
 * component, from messages/en.json) rather than looked up here, so this
 * stays a plain, translation-agnostic component that MDX can render
 * directly.
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
      <h3 className="mt-10 font-head text-h3 font-semibold text-ink">
        {title}
      </h3>
      <div className="mt-3 max-w-prose text-body text-ink">{children}</div>
    </section>
  );
}
