import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";

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
