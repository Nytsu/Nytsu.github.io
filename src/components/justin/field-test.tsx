import { justinFieldTest } from "../../content";
import Reveal from "../reveal";

/**
 * The most important section on this page — it's the proof that JustIn has
 * actually been used by real people, not just built. Same dl pattern the
 * homepage used to carry its case-study depth, moved here where the depth
 * now lives.
 */
export default function FieldTest() {
  return (
    <Reveal className="border-rule border-t pt-8">
      <p className="section-label mb-6">{justinFieldTest.label}</p>

      <p className="mb-8 max-w-[29rem] text-body text-copy">
        {justinFieldTest.summary}
      </p>

      <dl className="grid gap-7 sm:grid-cols-[7rem_1fr] sm:gap-x-8 sm:gap-y-8">
        {justinFieldTest.detail.map((block) => (
          <div key={block.label} className="contents">
            <dt className="section-label mb-2 sm:mb-0 sm:pt-1.5">
              {block.label}
            </dt>
            <dd className="max-w-[29rem] text-desc text-copy">{block.text}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
