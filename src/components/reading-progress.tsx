/**
 * Brief section 6.4's "reading progress" variant, used under the nav on project
 * pages (brief section 6.7). Presentational only — `progress` (0-100) is a
 * plain prop; `ScrollReadingProgress` owns the actual scroll-position
 * tracking and passes the number down.
 *
 * This track sits a few pixels below the nav header — that gap is padding
 * on `ScrollReadingProgress`'s wrapper (not here: `height: 1px` plus
 * padding on the same element is a box-sizing fight not worth having,
 * and margin would collapse through into the sticky parent and do
 * nothing — see that component for the full explanation). The gap is
 * what lets the dot be properly centered on the line (`-top-1`, matching
 * its own half-height) without poking back up into the header, which an
 * earlier version did — that overlap got hard-clipped at the header's
 * edge regardless of z-index, since both are independently `sticky`
 * elements (a real browser rendering quirk with overlapping sticky
 * elements, not a stacking-order problem to win). Fill is 2px, not 3 —
 * slim enough to read as a line, not a bar.
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
        className="-top-px absolute inset-y-0 left-0 h-[2px] bg-accent"
        style={{ width: `${clamped}%` }}
      />
      <div
        aria-hidden="true"
        className="-top-1 absolute z-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-accent"
        style={{ left: `${clamped}%` }}
      />
    </div>
  );
}
