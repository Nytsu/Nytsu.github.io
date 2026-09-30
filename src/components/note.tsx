import type { ReactNode } from "react";

/** Brief section 6.9: a status/caveat callout — e.g. "second field test planned"
 * on a project page. An ink top rule, not a colored box: the system has no
 * "warning yellow" or "info blue," so a note is set apart by structure
 * (the rule) rather than color. */
export function Note({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-[52ch] border-t border-ink pt-3">
      <h4 className="component-title text-ink">{title}</h4>
      <p className="mt-1 text-nav text-muted">{children}</p>
    </div>
  );
}
