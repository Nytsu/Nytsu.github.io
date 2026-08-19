import { experience, resumeHref } from "../content";

/**
 * Short, NDA-safe lines only: company, role, one sentence. No case-study depth
 * on employer work — that boundary is deliberate (brand-guidelines.md 8.4).
 * A quick overview, not the résumé itself — hence the link out to the real one.
 */
export default function Experience() {
  return (
    <section className="border-rule border-t pt-8">
      <p className="section-label mb-6">02 / Experience</p>

      <ul className="mb-6">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.period}`}
            className="border-rule-faint border-b py-5 last:border-b-0 last:pb-0"
          >
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-body font-medium text-ink">{role.company}</h3>
              <span className="font-mono text-nav text-secondary">
                {role.period}
              </span>
            </div>
            <p className="mb-1 text-nav text-secondary">{role.role}</p>
            <p className="max-w-[29rem] text-desc text-copy">{role.line}</p>
          </li>
        ))}
      </ul>

      <a
        href={resumeHref}
        className="text-nav text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
      >
        View résumé →
      </a>
    </section>
  );
}
