import { hero, justinUrl } from "../content";
import Reveal from "./reveal";

/**
 * The mark, the name, the positioning statement. The accent appears exactly
 * twice: the mark, and one word in the positioning line, which is also the
 * one place this page links out to the JustIn product site (justinfencing.com)
 * rather than the case study at /justin/.
 *
 * Deliberately stops there — no capability list. Scope (hardware, firmware,
 * app, design) is demonstrated through the work below instead of asserted here.
 *
 * No bottom padding on purpose — section spacing comes from the flex `gap` on
 * <main>. Setting both stacks them into ~12rem, past the 4–6rem section rhythm.
 */
export default function Hero() {
  return (
    <Reveal className="pt-[13vh]">
      <div className="mb-7">
        <span className="mark" aria-hidden="true" />
      </div>

      <h1 className="mb-4 text-name-sm font-medium text-ink sm:whitespace-nowrap sm:text-name">
        {hero.name}
      </h1>

      <p className="mb-14 font-mono text-tagline text-secondary">
        {hero.tagline}
      </p>

      <p className="max-w-[27.5rem] text-body text-copy">
        {hero.positioning.before}
        <a
          href={justinUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent-deep underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent-deep"
        >
          {hero.positioning.accent}
        </a>
        {hero.positioning.after}
      </p>

      <ul className="mt-6 flex gap-4">
        {hero.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noreferrer noopener" : undefined
              }
              className="text-nav text-secondary transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
