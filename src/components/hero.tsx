import { hero } from "../content";

/**
 * The mark, the name, the positioning statement. The accent appears exactly
 * twice: the mark, and one word in the positioning line. Nothing else on this
 * screen gets it.
 *
 * Deliberately stops there — no capability list. Scope (hardware, firmware,
 * app, design) is demonstrated through the work below instead of asserted here.
 *
 * No bottom padding on purpose — section spacing comes from the flex `gap` on
 * <main>. Setting both stacks them into ~12rem, past the 4–6rem section rhythm.
 */
export default function Hero() {
  return (
    <section id="about" className="scroll-mt-24 pt-[13vh]">
      <div className="mb-7 flex items-center gap-2.5">
        <span className="mark" aria-hidden="true" />
        <span className="section-label">One touch</span>
      </div>

      <h1 className="mb-4 text-name-sm font-medium text-ink sm:whitespace-nowrap sm:text-name">
        {hero.name}
      </h1>

      <p className="mb-14 font-mono text-tagline text-secondary">
        {hero.tagline}
      </p>

      <p className="max-w-[27.5rem] text-body text-copy">
        {hero.positioning.before}
        <span className="text-accent-deep">{hero.positioning.accent}</span>
        {hero.positioning.after}
      </p>
    </section>
  );
}
