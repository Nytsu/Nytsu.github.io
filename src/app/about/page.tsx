import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonClasses } from "@/components/button";
import { Container } from "@/components/container";
import { email, github, linkedin, resumeHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: { canonical: "/about" },
  };
}

export default async function About() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    // Same top padding as every other page's Container (CV) so About starts
    // at the same vertical position when navigating between them — not
    // vertically centered, which looked balanced in isolation but put
    // About's content at a different height than its neighbors.
    <Container className="py-18">
      <h1 className="font-head text-h2 font-semibold text-ink">{t("title")}</h1>
      <div className="mt-6 grid gap-8 sm:grid-cols-[3fr_7fr] sm:items-center">
        <div className="max-w-prose">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-body text-ink first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
        {/* Circular, by request — the only image on the site that doesn't
         * use Figure's shared square/slight-radius treatment. flex+justify-
         * center keeps the circle centered in its column instead of hugging
         * the left edge once the column grows wider than max-w-72. */}
        <div className="flex justify-center sm:order-first">
          <div className="relative aspect-square w-full max-w-72 overflow-hidden rounded-full border border-line bg-subtle">
            <Image
              src="/images/profile/justin-portrait.jpg"
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 640px) 288px, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Contact isn't a separate page (brief section 5's site map originally
       * had one) — the footer already repeats email/GitHub/LinkedIn on every
       * page, so a standalone Contact page was mostly redundant. This is the
       * one place it gets the fuller treatment: email first as the primary
       * action (brief section 5: "plain email link first"), the rest as
       * secondary links. */}
      <div className="mt-12">
        <h2 className="border-b border-line border-dotted pb-4 font-head text-h3 font-semibold text-ink">
          {t("contact.heading")}
        </h2>
        <p className="mt-4 max-w-prose text-body text-ink">
          {t("contact.intro")}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={`mailto:${email}`} className={buttonClasses("primary")}>
            {email}
          </a>
          <a href={linkedin} className={buttonClasses("ghost")}>
            {t("contact.linkedin")}
          </a>
          <a href={github} className={buttonClasses("ghost")}>
            {t("contact.github")}
          </a>
          <a href={resumeHref} className={buttonClasses("ghost")}>
            {t("contact.resume")}
          </a>
        </div>
      </div>
    </Container>
  );
}
