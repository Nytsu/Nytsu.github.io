import { featured, projects } from "../content";

/**
 * One section, three projects, deliberately unequal treatment. JustIn is the
 * only one that gets a title, a description, and tags — it's the thing the
 * whole homepage is building toward. The other two are compact list entries so
 * they never compete with it visually.
 *
 * JustIn's technical depth (problem, architecture, hardware, software, field
 * test) lives on its own page at `featured.href`. This is the introduction
 * only.
 */
export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-rule border-t pt-8">
      <p className="section-label mb-8">{featured.label}</p>

      <div className="mb-8 border-rule-faint border-b pb-8">
        <h3 className="mb-2 text-h2 font-medium text-accent">
          {featured.title}
        </h3>
        <p className="mb-3 max-w-[26.25rem] text-desc text-secondary">
          {featured.summary}
        </p>
        <p className="mb-5 max-w-[29rem] text-desc text-copy">
          {featured.description}
        </p>
        <p className="section-label mb-5">{featured.tags.join(" · ")}</p>
        <a
          href={featured.href}
          className="text-nav text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
        >
          View project →
        </a>
      </div>

      <ul>
        {projects.map((project) => (
          <li
            key={project.title}
            className="border-rule-faint border-b py-5 last:border-b-0 last:pb-0"
          >
            <h3 className="mb-1.5 text-body font-medium text-ink">
              {project.title}
            </h3>
            <p className="max-w-[29rem] text-desc text-secondary">
              {project.description}
            </p>
            {"href" in project && (
              <a
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="mt-2 inline-block text-nav text-secondary underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
              >
                {project.linkLabel} →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
