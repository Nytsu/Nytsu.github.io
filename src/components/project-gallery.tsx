import Link from "next/link";
import { Figure } from "@/components/figure";

export type ProjectGalleryItem = {
  slug: string;
  href: string;
  name: string;
  role: string;
  builtWith: string;
  status: { label: string; active: boolean };
  mainImage?: { src: string; alt: string };
};

/**
 * Brief section 6.3: the home page centerpiece. Every project, including
 * JustIn, gets the identical treatment here — a large, consistently-framed
 * image followed by a spare, museum-placard-style caption. One visual
 * grammar for every entry rather than a special "featured" layout for one
 * and a plain list for the rest — standardized, and closer to how a curated
 * image gallery presents work than a data table does.
 *
 * Named "Project", not "Work", deliberately: the public-facing nav label
 * and section heading stay "Work" (brief section 5's explicit nav spec —
 * not ours to rename), but that's just the container's label. Each entry is
 * a self-directed project, matching both the brief's own content-model
 * language (section 9: "Projects (initial set)") and the old site's
 * content.ts, which had a `Project` type for this same data. Internal code
 * names don't have to mirror public UI copy.
 *
 * The caption is a title row (name, with status as a badge opposite it —
 * a familiar "state indicator across from the title" pattern) and one
 * meta line below (role · built-with), rather than three same-styled lines
 * stacked with no hierarchy between them.
 *
 * Two per row on wide screens, stacked on narrow ones — contained images,
 * not full-bleed, since two edge-to-edge images can't sit side by side. The
 * image dims slightly until the row is hovered/focused (Figure's
 * `interactive` prop) — opacity only, per brief section 7. A subtle
 * `bg-subtle` wash appears on hover/focus too, but only then — a permanent
 * background behind every item would combine with the rounded image
 * corners into the "identical rounded card grid" look brief section 2
 * avoids. The `-m-4 p-4` pair insets the wash without shifting the image's
 * actual position in the grid.
 *
 * mainImage is frontmatter.cover — the same image used as that project's
 * own page's lead figure. A project without one yet shows a quiet
 * placeholder, not a gap.
 */
export function ProjectGallery({
  items,
}: {
  items: readonly ProjectGalleryItem[];
}) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className="group -m-4 block rounded-control p-4 no-underline hover:bg-subtle focus-visible:bg-subtle"
        >
          <Figure
            {...(item.mainImage
              ? { src: item.mainImage.src, alt: item.mainImage.alt }
              : {})}
            ratio="4/3"
            interactive
          />
          <div className="mt-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="truncate font-head text-h3 font-semibold text-ink underline-offset-[0.2em] decoration-1 group-hover:text-accent group-hover:underline">
                {item.name}
              </h3>
              <span className="inline-flex flex-none items-center gap-1.5 text-small text-muted">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.status.active ? "bg-accent" : "bg-muted opacity-60"
                  }`}
                />
                {item.status.label}
              </span>
            </div>
            <p className="mt-1 text-small text-muted">
              {item.role} · {item.builtWith}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
