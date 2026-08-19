import Reveal from "../reveal";

/**
 * Generic label + paragraph(s) section, reused across the JustIn page
 * (Overview, Problem) so those don't need one-off components for what is
 * structurally the same block.
 */
export default function TextSection({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  return (
    <Reveal className="border-rule border-t pt-8">
      <p className="section-label mb-6">{label}</p>
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-[29rem] text-desc text-copy">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
