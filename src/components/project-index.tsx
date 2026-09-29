import Image from "next/image";
import Link from "next/link";

export type ProjectIndexItem = {
  slug: string;
  href: string;
  name: string;
  role: string;
  builtWith: string;
  status: { label: string; active: boolean };
  thumbnail?: { src: string; alt: string };
};

/**
 * Brief §6.3: the home page centerpiece. Each row is one project, and the
 * whole row is the link — a reviewer sees the range in a few seconds and
 * reaches any project in one click.
 *
 * Column widths and the mobile breakpoint (860px) match the reference tile
 * exactly rather than Tailwind's default scale, so this reads identically
 * to the tile at every width.
 */
export function ProjectIndex({
  items,
  labels,
}: {
  items: readonly ProjectIndexItem[];
  labels: {
    project: string;
    role: string;
    builtWith: string;
    status: string;
  };
}) {
  return (
    <div className="border-t border-ink">
      <div
        aria-hidden="true"
        className="hidden grid-cols-[72px_1.3fr_1.4fr_1.4fr_1fr] gap-6 border-b border-line px-2 py-3 text-small text-muted min-[860px]:grid"
      >
        <span />
        <span>{labels.project}</span>
        <span>{labels.role}</span>
        <span>{labels.builtWith}</span>
        <span>{labels.status}</span>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="group grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-1 border-b border-line px-1 py-4 text-ink no-underline hover:bg-subtle min-[860px]:grid-cols-[72px_1.3fr_1.4fr_1.4fr_1fr] min-[860px]:gap-x-6 min-[860px]:gap-y-0 min-[860px]:px-2 min-[860px]:py-5"
            >
              <div
                className="relative row-span-3 aspect-square overflow-hidden border border-line bg-subtle min-[860px]:row-span-1"
                style={{ borderRadius: "min(var(--img-radius), 8px)" }}
              >
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail.src}
                    alt={item.thumbnail.alt}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                )}
              </div>

              <span className="col-start-2 font-semibold leading-tight group-hover:text-accent group-hover:underline min-[860px]:col-auto">
                {item.name}
              </span>
              <span className="col-start-2 text-nav text-muted min-[860px]:col-auto">
                {item.role}
              </span>
              <span className="col-start-2 text-nav text-muted min-[860px]:col-auto">
                {item.builtWith}
              </span>
              <span className="col-start-2 inline-flex items-center gap-2 text-nav text-muted min-[860px]:col-auto">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 flex-none rounded-full ${
                    item.status.active ? "bg-accent" : "bg-muted opacity-60"
                  }`}
                />
                {item.status.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
