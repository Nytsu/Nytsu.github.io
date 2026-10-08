export function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="M6 4l5 4-5 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
