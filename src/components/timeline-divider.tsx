/** Brief section 6.4's "quiet section divider" variant: the same line motif,
 * turned all the way down — a hairline rule with ticks, purely decorative.
 * Not data-driven like Timeline; it's a fixed visual texture, not a
 * representation of any real sequence. */
export function TimelineDivider() {
  const ticks = Array.from({ length: 41 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className="relative mt-12 h-[18px] border-t border-ink"
    >
      {ticks.map((i) => (
        <i
          key={i}
          className={
            i % 10 === 0
              ? "absolute top-0 h-2 w-px bg-ink"
              : "absolute top-0 h-[5px] w-px bg-muted opacity-60"
          }
          style={{ left: `${(i / 40) * 100}%` }}
        />
      ))}
    </div>
  );
}
