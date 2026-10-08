import type { ReactNode } from "react";

/** The shared max-width + side-padding wrapper (brief section 3: 1120px max width,
 * 24px side padding). The 12-column grid itself is composed per component
 * with plain `grid grid-cols-12` where a layout actually needs columns —
 * this just keeps every section's outer edge aligned.
 *
 * `w-full` is explicit rather than relying on the default block-level
 * `width: auto`: a flex item with auto margins — `mx-auto` — doesn't
 * stretch to its container's full width by default the way a normal block
 * box does; it shrink-wraps to its own content instead. `main` was briefly
 * a flex container while About used flex-grow for vertical centering, and
 * for a Container whose content is narrower than 1120px (e.g. the home
 * hero's two short lines), that silently produced a smaller,
 * still-centered-but-wrong-width box instead of the intended 1120px-capped
 * one. `main` is plain block again now, but `w-full` stays — it removes
 * the ambiguity regardless of what kind of parent Container ends up
 * inside, present or future. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-2 ${className}`}>
      {children}
    </div>
  );
}
