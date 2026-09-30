import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";

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
    <Container className="py-18">
      <h1 className="font-head text-h2 font-semibold text-ink">{t("title")}</h1>
      <div className="mt-6 max-w-prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-body text-ink first:mt-0">
            {paragraph}
          </p>
        ))}
      </div>
    </Container>
  );
}
