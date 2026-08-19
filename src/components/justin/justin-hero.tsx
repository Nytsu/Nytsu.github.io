import { justinHero } from "../../content";
import Reveal from "../reveal";

/**
 * Same visual grammar as the homepage Hero (mark, mono eyebrow, name-scale
 * heading) so landing here directly doesn't feel like a different site.
 */
export default function JustinHero() {
  return (
    <Reveal className="pt-[13vh]">
      <div className="mb-7 flex items-center gap-2.5">
        <span className="mark" aria-hidden="true" />
        <span className="section-label">{justinHero.eyebrow}</span>
      </div>

      <h1 className="mb-4 max-w-[29rem] text-name-sm font-medium text-ink sm:text-name">
        {justinHero.title}
      </h1>

      <p className="mb-8 max-w-[27.5rem] text-body text-copy">
        {justinHero.intro}
      </p>

      <p className="section-label">{justinHero.tags.join(" · ")}</p>
    </Reveal>
  );
}
