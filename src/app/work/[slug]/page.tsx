import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Figure } from "@/components/figure";
import { Note } from "@/components/note";
import { ScrollReadingProgress } from "@/components/scroll-reading-progress";
import { Section } from "@/components/section";
import { SpecBlock } from "@/components/spec-block";
import { TableOfContents } from "@/components/table-of-contents";
import { getWorkEntry, getWorkSlugs } from "@/lib/work-content";
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
  const t = await getTranslations("workPage");

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
  };

  return (
    <>
      <ScrollReadingProgress />

      <Container className="py-18">
        <p className="text-label text-muted">{frontmatter.year}</p>
        <h1 className="mt-4 font-head text-display font-semibold text-ink">
          {frontmatter.title}
        </h1>
        <p className="mt-4 max-w-prose text-nav text-muted">
          {frontmatter.summary}
        </p>

        <div id="overview">
          <SpecBlock
            labels={{
              role: t("spec.role"),
              scope: t("spec.scope"),
              status: t("spec.status"),
              builtWith: t("spec.builtWith"),
            }}
            role={frontmatter.role}
            scope={frontmatter.scope}
            status={frontmatter.status}
            builtWith={frontmatter.builtWith}
          />
        </div>

        <Figure
          {...(frontmatter.cover
            ? { src: frontmatter.cover.src, alt: frontmatter.cover.alt }
            : {})}
          ratio="16/9"
          fullBleed
        />

        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <TableOfContents
            heading={t("onThisPage")}
            overviewLabel={t("overview")}
            items={tocItems}
          />
          <article>
            <MDXRemote source={content} components={components} />
          </article>
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
