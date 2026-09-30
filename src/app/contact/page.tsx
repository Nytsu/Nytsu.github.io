import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buttonClasses } from "@/components/button";
import { Container } from "@/components/container";
import { email, github, linkedin, resumeHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: "/contact" },
  };
}

/** Brief section 5: plain email link first, no form — a static export has
 * no server to handle one (see CLAUDE.md's hosting note). */
export default async function Contact() {
  const t = await getTranslations("contact");

  return (
    <Container className="py-18">
      <h1 className="font-head text-h2 font-semibold text-ink">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-body text-ink">{t("intro")}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={`mailto:${email}`} className={buttonClasses("primary")}>
          {email}
        </a>
        <a href={linkedin} className={buttonClasses("ghost")}>
          {t("linkedin")}
        </a>
        <a href={github} className={buttonClasses("ghost")}>
          {t("github")}
        </a>
        <a href={resumeHref} className={buttonClasses("ghost")}>
          {t("resume")}
        </a>
      </div>
    </Container>
  );
}
