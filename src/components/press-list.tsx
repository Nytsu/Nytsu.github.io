import type { WorkArticle } from "@/lib/work-content";

type PressListProps = {
  articles: readonly WorkArticle[];
  readLabel: string;
  newTabLabel: string;
  languageLabels: Record<"en" | "es", string>;
};

/** Press coverage as text previews for the project page's press tab:
 * outlet, headline and excerpt as the outlet publishes them, no third-party
 * images. Hairline rules separate rows, per brief section 3. */
export function PressList({
  articles,
  readLabel,
  newTabLabel,
  languageLabels,
}: PressListProps) {
  return (
    <ul className="border-t border-line">
      {articles.map((article) => (
        <li key={article.href} className="border-b border-line py-5">
          <p className="text-small text-muted">
            {article.outlet}
            {article.language && ` · ${languageLabels[article.language]}`}
          </p>
          <p
            lang={article.language}
            className="mt-2 max-w-prose font-head text-h3 font-semibold text-ink"
          >
            {article.title}
          </p>
          {article.excerpt && (
            <p
              lang={article.language}
              className="mt-2 max-w-prose text-body text-muted"
            >
              {article.excerpt}
            </p>
          )}
          <a
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-accent underline"
          >
            {readLabel.replace("{outlet}", article.outlet)}
            <span className="sr-only"> ({newTabLabel})</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
