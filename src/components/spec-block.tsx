import { AvatarGroup } from "@/components/avatar-group";
import type { WorkTeamMember } from "@/lib/work-content";

/** Brief section 6.7: Role, Team, Status, Built with — a definition list,
 * not prose, so it scans in a couple of seconds. Label-left/value-right per
 * row (a fixed-width `dt` beside its `dd`, one line tall whenever the value
 * allows it) rather than label-above-value-below: stacking each field onto
 * two lines was most of the extra vertical space the block was taking.
 * `divide-y` between rows only, no outer top/bottom rule (brief section 3:
 * hairline rules as the main structural device) rather than bare vertical
 * gaps, which read like a Notion property list instead of a structured spec
 * sheet. Labels are `text-label` (13px) to match the year eyebrow above the
 * title, rather than `text-small` (14px) — distinct enough from the 15px
 * values to read as label/value instead of two near-identical sizes.
 *
 * Team replaces the brief's "Scope" field: who worked on it (Justin plus
 * any confirmed collaborator or organization), each as a small initials
 * avatar and a name rather than a photo — no real photos exist yet (brief
 * section 10 bars inventing facts, and a likeness is exactly that).
 *
 * Built with renders as the tile's Tag component (brief section 6.9), styled
 * display-only — no "on" selected state, since this isn't the index filter
 * that component was built for and brief section 12 already dropped. */
export function SpecBlock({
  labels,
  role,
  team,
  status,
  statusActive,
  builtWith,
}: {
  labels: { role: string; team: string; status: string; builtWith: string };
  role: string;
  team: readonly WorkTeamMember[];
  status: string;
  statusActive: boolean;
  builtWith: readonly string[];
}) {
  return (
    <dl className="my-8 divide-y divide-line">
      <div className="flex items-center gap-6 py-3">
        <dt className="w-28 flex-none text-label text-muted">{labels.role}</dt>
        <dd className="text-nav text-ink">{role}</dd>
      </div>

      <div className="flex items-start gap-6 py-3">
        <dt className="w-28 flex-none pt-0.5 text-label text-muted">
          {labels.team}
        </dt>
        <dd>
          <AvatarGroup team={team} />
        </dd>
      </div>

      <div className="flex items-center gap-6 py-3">
        <dt className="w-28 flex-none text-label text-muted">
          {labels.status}
        </dt>
        <dd className="flex items-center gap-2 text-nav text-ink">
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 flex-none rounded-full ${
              statusActive ? "bg-accent" : "bg-muted opacity-60"
            }`}
          />
          {status}
        </dd>
      </div>

      <div className="flex items-start gap-6 py-3">
        <dt className="w-28 flex-none pt-0.5 text-label text-muted">
          {labels.builtWith}
        </dt>
        <dd className="flex flex-wrap gap-2">
          {builtWith.map((tech) => (
            <span
              key={tech}
              className="rounded-control border border-line px-3 py-2 text-small leading-none text-ink"
            >
              {tech}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
