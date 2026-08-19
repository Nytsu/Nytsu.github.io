import { currently } from "../content";

/**
 * Deliberately one sentence. This section exists to answer "what is he doing
 * right now", not to restate the hero or the work above it.
 */
export default function Currently() {
  return (
    <section id="currently" className="scroll-mt-24 border-rule border-t pt-8">
      <p className="section-label mb-6">{currently.label}</p>
      <p className="max-w-[29rem] text-desc text-copy">{currently.text}</p>
    </section>
  );
}
