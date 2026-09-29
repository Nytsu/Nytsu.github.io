import type { ButtonHTMLAttributes } from "react";

/** Brief section 6.9: for filtering the project index. The selected tag gets an
 * ink outline — no color-only state, so it still reads under
 * prefers-reduced-transparency or without the accent hue registering. */
export function Tag({
  selected = false,
  className = "",
  ...props
}: {
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`rounded-control border px-3 py-2 text-small leading-none ${
        selected ? "border-ink" : "border-line"
      } ${className}`}
      {...props}
    />
  );
}
