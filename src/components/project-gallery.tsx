import { Figure } from "@/components/figure";
import { ScrollTopLink as Link } from "@/components/scroll-top-link";

export type ProjectGalleryItem = {
  slug: string;
  href: string;
  name: string;
  summary: string;
  role: string;
  builtWith: string;
  order: number;
  status: { label: string; active: boolean };
  mainImage?: { src: string; alt: string; background?: string };
};

/**
 * Brief section 6.3: one full-width row per project, image after text in
 * the DOM so mobile reads what it is before how it looks. The accent tint
 * only shows on hover — a permanent background would read as the "card
 * grid" look brief section 2 avoids.
 */
export function ProjectGallery({
  items,
}: {
  items: readonly ProjectGalleryItem[];
}) {
  return (
    <div>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className="group grid grid-cols-1 items-center gap-6 border border-transparent rounded-img p-8 no-underline transition-colors duration-200 hover:border-accent hover:bg-accent/10 focus-visible:border-accent focus-visible:bg-accent/10 sm:grid-cols-2 sm:gap-10"
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-head text-h2 font-semibold text-ink group-hover:text-accent">
                {item.name}
              </h3>
              <span className="mt-1.5 inline-flex flex-none items-center gap-1.5 text-small text-muted">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.status.active ? "bg-accent" : "bg-muted opacity-60"
                  }`}
                />
                {item.status.label}
              </span>
            </div>
            <p className="mt-3 max-w-prose text-body text-muted">
              {item.summary}
            </p>
            <p className="mt-4 text-label text-muted opacity-70">
              {item.role} · {item.builtWith}
            </p>
          </div>

          <Figure
            {...(item.mainImage
              ? {
                  src: item.mainImage.src,
                  alt: item.mainImage.alt,
                  ...(item.mainImage.background
                    ? { background: item.mainImage.background }
                    : {}),
                }
              : {})}
            ratio="16/9"
            interactive
            fit="contain"
          />
        </Link>
      ))}
    </div>
  );
}
