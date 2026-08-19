import { justinArchitecture } from "../../content";
import Reveal from "../reveal";

/**
 * The pipeline as a plain mono chain with arrow separators — structure, not
 * a diagram widget. Consistent with the rest of the system's "no cards"
 * position on showing relationships.
 */
export default function Architecture() {
  return (
    <Reveal className="border-rule border-t pt-8">
      <p className="section-label mb-6">{justinArchitecture.label}</p>

      <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-nav text-copy">
        {justinArchitecture.pipeline.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <span>{step}</span>
            {index < justinArchitecture.pipeline.length - 1 && (
              <span aria-hidden="true" className="text-secondary">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-4">
        {justinArchitecture.text.map((paragraph) => (
          <p key={paragraph} className="max-w-[29rem] text-desc text-copy">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
