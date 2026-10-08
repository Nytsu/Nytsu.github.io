import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { ProjectGallery } from "@/components/project-gallery";
import {
  getAllWorkEntries,
  getIndexImage,
  isActiveStatus,
} from "@/lib/work-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: { absolute: "Justin J De La Cruz" },
    description: t("metaDescription"),
    alternates: { canonical: "/" },
  };
}

/**
 * Brief section 5: a one-sentence introduction and the project index. Every
 * project — JustIn included — gets the identical gallery treatment in
 * ProjectGallery; JustIn simply appears first (getAllWorkEntries is already
 * sorted by frontmatter.order).
 *
 * The hero is sized to its own content, not the viewport, so the project
 * list — the actual centerpiece (section 6.3) — is visible without a
 * full scroll.
 */
export default async function Home() {
  const t = await getTranslations("home");
  const entries = getAllWorkEntries();

  return (
    <>
      <Container className="py-18">
        <p className="text-nav text-muted">{t("tagline")}</p>
        <h1 className="mt-3 max-w-4xl text-balance font-head text-display font-semibold text-ink">
          {t("greeting")}
          <br />
          {t("headline")}
        </h1>
      </Container>

      <Container className="pb-18">
        <div>
          <h2 className="border-b border-line border-dotted pb-4 font-head text-h3 font-semibold text-ink">
            {t("work")}
          </h2>
          <div className="mt-6">
            <ProjectGallery
              items={entries.map((entry) => {
                const indexImage = getIndexImage(entry.frontmatter);
                return {
                  slug: entry.frontmatter.slug,
                  href: `/work/${entry.frontmatter.slug}`,
                  name: entry.frontmatter.title,
                  summary: entry.frontmatter.summary,
                  role: entry.frontmatter.role,
                  builtWith: entry.frontmatter.builtWith.join(", "),
                  order: entry.frontmatter.order,
                  status: {
                    label: entry.frontmatter.status,
                    active: isActiveStatus(entry.frontmatter.status),
                  },
                  ...(indexImage
                    ? {
                        mainImage: indexImage,
                      }
                    : {}),
                };
              })}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
