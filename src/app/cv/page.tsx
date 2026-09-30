import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buttonClasses } from "@/components/button";
import { Container } from "@/components/container";
import { experience } from "@/lib/experience";
import { resumeHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cv");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: "/cv" },
  };
}

/** Brief section 5: page plus downloadable PDF, with a print stylesheet.
 * The print rules themselves live in globals.css (a `print:` media query),
 * since they apply to the whole page (hiding nav/footer/progress line),
 * not just this component. */
export default async function CV() {
  const t = await getTranslations("cv");

  return (
    <Container className="py-18 print:py-0">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-head text-h2 font-semibold text-ink">
          {t("title")}
        </h1>
        <a
          href={resumeHref}
          className={`${buttonClasses("ghost")} print:hidden`}
        >
          {t("download")}
        </a>
      </div>

      <h2 className="mt-10 component-title text-ink">{t("experience")}</h2>
      <ol className="mt-4 border-t border-line">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.period}`}
            className="border-b border-line py-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-semibold text-ink">
                {role.role}, {role.company}
              </span>
              <span className="text-small text-muted">{role.period}</span>
            </div>
            <p className="mt-1 max-w-prose text-nav text-muted">{role.line}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
