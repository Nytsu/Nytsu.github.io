import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";

/** Placeholder route so nav links resolve. Real content: brief §13 stage 6. */
export default async function About() {
  const t = await getTranslations("placeholder.about");

  return (
    <Container className="py-18">
      <p className="text-label text-muted">{t("eyebrow")}</p>
      <h1 className="mt-4 font-head text-h2 font-semibold text-ink">
        {t("title")}
      </h1>
    </Container>
  );
}
