import { about } from "../content";
import Reveal from "./reveal";

/**
 * Short and personal, not an autobiography. Exists to connect the dots between
 * "software developer and founder" and "why fencing hardware, specifically" —
 * the one piece of context the work section can't carry on its own.
 */
export default function About() {
  return (
    <Reveal id="about" className="scroll-mt-24 border-rule border-t pt-8">
      <p className="section-label mb-6">{about.label}</p>
      <div className="flex flex-col gap-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-[29rem] text-body text-copy">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
