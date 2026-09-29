import type { ReactNode } from "react";

/** The shared max-width + side-padding wrapper (brief §3: 1120px max width,
 * 24px side padding). The 12-column grid itself is composed per component
 * with plain `grid grid-cols-12` where a layout actually needs columns —
 * this just keeps every section's outer edge aligned. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-(--container-page) px-6 ${className}`}>
      {children}
    </div>
  );
}
