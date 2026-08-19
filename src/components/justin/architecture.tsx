import { justinArchitecture } from "../../content";

/**
 * The pipeline as a plain mono chain with arrow separators — structure, not
 * a diagram widget. Consistent with the rest of the system's "no cards"
 * position on showing relationships.
 */
export default function Architecture() {
  return (
    <section className="border-rule border-t pt-8">
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

      <p className="max-w-[29rem] text-desc text-copy">
        {justinArchitecture.text}
      </p>
    </section>
  );
}
