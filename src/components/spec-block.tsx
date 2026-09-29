/** Brief section 6.7: Role, Scope, Status, Built with — a definition list,
 * not prose, so it scans in a couple of seconds. */
export function SpecBlock({
  labels,
  role,
  scope,
  status,
  builtWith,
}: {
  labels: { role: string; scope: string; status: string; builtWith: string };
  role: string;
  scope: string;
  status: string;
  builtWith: string;
}) {
  const items = [
    [labels.role, role],
    [labels.scope, scope],
    [labels.status, status],
    [labels.builtWith, builtWith],
  ] as const;

  return (
    <dl className="my-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="text-small text-muted">{label}</dt>
          <dd className="mt-1 text-nav text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
