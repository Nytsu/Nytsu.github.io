/**
 * Generic label + mono item list, same structural treatment as the homepage
 * tag rows. Reused for Hardware, Software, and Next.
 */
export default function ListSection({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <section className="border-rule border-t pt-8">
      <p className="section-label mb-6">{label}</p>
      <p className="font-mono text-nav text-copy">{items.join(" · ")}</p>
    </section>
  );
}
