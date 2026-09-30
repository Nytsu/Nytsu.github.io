import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { ProjectGallery } from "@/components/project-gallery";
import { getAllWorkEntries } from "@/lib/work-content";

/**
 * Brief section 5: a one-sentence introduction, the timeline, the project
 * index. Every project — JustIn included — gets the identical gallery
 * treatment in ProjectGallery; JustIn simply appears first (getAllWorkEntries
 * is already sorted by frontmatter.order), rather than getting a separate
 * "featured" layout. Timeline is hidden for now, pending a decision on
 * whether it belongs on the home page at all.
 */
export default async function Home() {
  const t = await getTranslations("home");
  const entries = getAllWorkEntries();

  return (
    <Container className="pt-12 pb-18">
      <p className="text-nav text-muted">{t("tagline")}</p>
      <h1 className="mt-3 max-w-2xl font-head text-display font-semibold text-ink">
        I build software and hardware products from idea to working prototype.
      </h1>

      <div className="mt-10 border-t border-line pt-10">
        <h2 className="font-head text-h2 font-semibold text-ink">
          {t("work")}
        </h2>
        <div className="mt-6">
          <ProjectGallery
            items={entries.map((entry) => ({
              slug: entry.frontmatter.slug,
              href: `/work/${entry.frontmatter.slug}`,
              name: entry.frontmatter.title,
              role: entry.frontmatter.role,
              builtWith: entry.frontmatter.builtWith,
              status: {
                label: entry.frontmatter.status,
                active:
                  entry.frontmatter.status === "Live" ||
                  entry.frontmatter.status === "In testing",
              },
              ...(entry.frontmatter.cover
                ? {
                    mainImage: {
                      src: entry.frontmatter.cover.src,
                      alt: entry.frontmatter.cover.alt,
                    },
                  }
                : {}),
            }))}
          />
        </div>
      </div>
    </Container>
  );
}
