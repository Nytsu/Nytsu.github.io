import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="py-24">
      <p className="text-label text-muted">{t("eyebrow")}</p>
      <h1 className="mt-4 font-head text-h2 font-semibold text-ink">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-prose text-body text-ink">{t("body")}</p>
      <Link href="/" className="mt-8 inline-block text-nav">
        {t("back")}
      </Link>
    </Container>
  );
}
