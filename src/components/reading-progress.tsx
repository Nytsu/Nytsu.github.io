/**
 * Brief §6.4's "reading progress" variant, used under the nav on project
 * pages (brief §6.7). Presentational only for now — `progress` (0-100) is a
 * plain prop; the actual scroll-position tracking gets wired up in stage 5
 * when the project page template exists to scroll through.
 */
export function ReadingProgress({ progress }: { progress: number }) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative h-px bg-line"
    >
      <div
        className="absolute inset-y-0 left-0 -top-px h-[3px] bg-accent"
        style={{ width: `${clamped}%` }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-1 z-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-accent"
        style={{ left: `${clamped}%` }}
      />
    </div>
  );
}
