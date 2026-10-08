import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { buttonClasses } from "@/components/button";
import { ChevronIcon } from "@/components/chevron-icon";
import { Container } from "@/components/container";
import { Figure } from "@/components/figure";
import { HeroGallery } from "@/components/hero-gallery";
import { Note } from "@/components/note";
import { PhoneGallery, PhoneScreen } from "@/components/phone-gallery";
import { ProjectModel } from "@/components/project-model";
import { ProjectVideo } from "@/components/project-video";
import { ScrollReadingProgress } from "@/components/scroll-reading-progress";
import { ScrollTopLink as Link } from "@/components/scroll-top-link";
import { Section } from "@/components/section";
import { SpecBlock } from "@/components/spec-block";
import { TableOfContents } from "@/components/table-of-contents";
import {
  avatar as justinAvatar,
  initials as justinInitials,
  name as justinName,
} from "@/lib/site";
import {
  getIndexImage,
  getNextWorkEntry,
  getWorkEntry,
  getWorkSlugs,
  isActiveStatus,
} from "@/lib/work-content";
import { type WorkSectionId, workSectionIds } from "@/lib/work-sections";

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

/**
 * Brief section 6.7: the project page template — title, one-line summary,
 * spec block, lead image, then the five fixed sections, with a sticky
 * contents list on wide screens and a reading-progress line under the nav.
 * One route serves every project; the content itself comes from
 * src/content/work/*.mdx.
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getWorkSlugs().includes(slug)) {
    notFound();
  }

  const { frontmatter, content } = getWorkEntry(slug);
  const nextEntry = getNextWorkEntry(slug);
  const t = await getTranslations("workPage");

  const team = [
    {
      name: justinName,
      role: frontmatter.role,
      initials: justinInitials,
      avatar: justinAvatar,
      avatarFit: "cover" as const,
    },
    ...(frontmatter.team ?? []),
  ];

  const heroImages = frontmatter.cover
    ? [frontmatter.cover, ...(frontmatter.gallery ?? [])]
    : [];
  const heroThumbnailLabels = heroImages.map((_, index) =>
    t("gallery.showImage", { number: index + 1 }),
  );

  const sectionLabels = Object.fromEntries(
    workSectionIds.map((id) => [id, t(`sections.${id}`)]),
  ) as Record<WorkSectionId, string>;

  const tocItems = workSectionIds.map((id) => ({
    id,
    label: sectionLabels[id],
  }));

  const components = {
    Section: ({ id, children }: { id: WorkSectionId; children: ReactNode }) => (
      <Section id={id} title={sectionLabels[id]}>
        {children}
      </Section>
    ),
    Figure,
    Note,
    PhoneGallery: ({ children }: { children: ReactNode }) => (
      <PhoneGallery
        prevLabel={t("appGallery.prev")}
        nextLabel={t("appGallery.next")}
        openLabel={t("gallery.viewLarger")}
        closeLabel={t("gallery.closeImage")}
      >
        {children}
      </PhoneGallery>
    ),
    PhoneScreen,
    ProjectModel,
    ProjectVideo,
  };

  return (
    <>
      <ScrollReadingProgress />

      <Container className="py-18">
        <Link href="/" className="inline-flex items-center gap-1.5 text-label">
          <ChevronIcon direction="left" />
          {t("backToWork")}
        </Link>
        <p className="mt-6 text-label text-muted">{frontmatter.year}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <h1 className="font-head text-display font-semibold text-ink">
            {frontmatter.title}
          </h1>
          {frontmatter.reference && (
            <a
              href={frontmatter.reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClasses("ghost")} w-full sm:w-auto`}
            >
              {frontmatter.reference.label}
              <span className="sr-only"> ({t("opensInNewTab")})</span>
            </a>
          )}
        </div>
        <p className="mt-4 max-w-prose text-nav text-muted">
          {frontmatter.summary}
        </p>

        <div id="overview" className="scroll-mt-32">
          <SpecBlock
            labels={{
              role: t("spec.role"),
              team: t("spec.team"),
              status: t("spec.status"),
              builtWith: t("spec.builtWith"),
            }}
            role={frontmatter.role}
            team={team}
            status={frontmatter.status}
            statusActive={isActiveStatus(frontmatter.status)}
            builtWith={frontmatter.builtWith}
          />
        </div>

        <HeroGallery
          images={heroImages}
          ratio="16/9"
          prevLabel={t("gallery.prev")}
          nextLabel={t("gallery.next")}
          thumbnailLabels={heroThumbnailLabels}
          openImageLabel={t("gallery.viewLarger")}
          closeImageLabel={t("gallery.closeImage")}
        />

        <TableOfContents
          heading={t("onThisPage")}
          overviewLabel={t("overview")}
          items={tocItems}
        >
          <MDXRemote source={content} components={components} />
        </TableOfContents>

        <div className="mt-18 border-t border-line pt-10">
          <p className="text-label text-muted">{t("nextProject")}</p>
          <Link
            href={`/work/${nextEntry.frontmatter.slug}`}
            className="group -m-4 mt-2 flex items-center gap-6 rounded-control p-4 no-underline transition-colors duration-200 hover:bg-accent/10 focus-visible:bg-accent/10"
          >
            <div className="w-28 flex-none sm:w-36">
              <Figure
                {...(getIndexImage(nextEntry.frontmatter) ?? {})}
                ratio="16/9"
                sizes="144px"
                interactive
                fit="contain"
              />
            </div>
            <span className="font-head text-h2 font-semibold text-ink group-hover:text-accent">
              {nextEntry.frontmatter.title}
            </span>
          </Link>
        </div>
      </Container>
    </>
  );
}

/** Title relies on the root layout's "%s — Justin J De La Cruz" template
 * rather than appending the name here, so every page's title is built the
 * same way. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getWorkSlugs().includes(slug)) return {};
  const { frontmatter } = getWorkEntry(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}
