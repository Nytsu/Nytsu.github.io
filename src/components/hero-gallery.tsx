"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronIcon } from "@/components/chevron-icon";
import { Figure } from "@/components/figure";
import { ImageLightbox } from "@/components/image-lightbox";
import { ProjectVideo } from "@/components/project-video";
import type { WorkGalleryItem } from "@/lib/work-content";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function MainMedia({
  item,
  ratio,
  openLabel,
  closeLabel,
}: {
  item: WorkGalleryItem;
  ratio: string;
  openLabel: string;
  closeLabel: string;
}) {
  const media =
    item.kind === "video" ? (
      <ProjectVideo src={item.src} ratio={ratio} autoPlay />
    ) : (
      <ImageLightbox
        src={item.src}
        alt={item.alt}
        openLabel={openLabel}
        closeLabel={closeLabel}
      >
        <Figure
          src={item.src}
          alt={item.alt}
          ratio={ratio}
          {...(item.fit ? { fit: item.fit } : {})}
        />
      </ImageLightbox>
    );

  return (
    <div className="relative animate-gallery-fade">
      {media}
      {item.caption && (
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-control border border-line bg-bg px-2 py-1 text-small text-ink">
          {item.caption}
        </span>
      )}
    </div>
  );
}

/** A project's lead image plus however many more are worth seeing. One
 * image behaves exactly as a plain `Figure` always has. Two or more add a
 * thumbnail row and prev/next arrows — but only at `sm:` and up. Arrows
 * plus a horizontally-scrolling thumbnail strip don't have room to work on
 * a narrow phone screen, so below `sm:` it's just every image stacked
 * vertically instead, each with its own caption below it (Figure's normal
 * caption treatment, not the overlay — this is a plain scrollable list, not
 * a selector). Both layouts render in the DOM; CSS `hidden`/`sm:hidden`
 * switches between them, and the hidden one's lazy-loaded images never
 * actually fetch, so there's no double-loading cost. Switching images is
 * plain state — no carousel library, no sliding: the active item swaps on
 * click, with a brief opacity crossfade (`animate-gallery-fade`, brief
 * section 7's "~180ms opacity change") rather than a hard cut. Every
 * image, in both layouts, opens full-size in an `ImageLightbox` on tap or
 * click.
 *
 * A `kind: "video"` item skips the lightbox (its own native controls
 * already fullscreen it) and the thumbnail strip shows a plain play-icon
 * tile instead of a frame grab — there's no cheap way to generate a real
 * poster image at build time for a static export. It autoplays (muted)
 * only once it becomes the active item here, an explicit exception to
 * brief section 2's "avoid autoplay video" for a ~7s silent clip the
 * viewer already chose to view by selecting its thumbnail — not something
 * that starts moving on page load. The mobile stacked list has no such
 * selection step, so its video stays click-to-play. */
export function HeroGallery({
  images,
  ratio,
  prevLabel,
  nextLabel,
  thumbnailLabels,
  openImageLabel,
  closeImageLabel,
}: {
  images: readonly WorkGalleryItem[];
  ratio: string;
  prevLabel: string;
  nextLabel: string;
  thumbnailLabels: readonly string[];
  openImageLabel: string;
  closeImageLabel: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <Figure ratio={ratio} />;
  }

  const current = images[active] as WorkGalleryItem;

  if (images.length === 1) {
    return (
      <MainMedia
        key={current.src}
        item={current}
        ratio={ratio}
        openLabel={openImageLabel}
        closeLabel={closeImageLabel}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-8 sm:hidden">
        {images.map((item) =>
          item.kind === "video" ? (
            <ProjectVideo
              key={item.src}
              src={item.src}
              ratio={ratio}
              {...(item.caption ? { caption: item.caption } : {})}
            />
          ) : (
            <ImageLightbox
              key={item.src}
              src={item.src}
              alt={item.alt}
              openLabel={openImageLabel}
              closeLabel={closeImageLabel}
            >
              <Figure
                src={item.src}
                alt={item.alt}
                ratio={ratio}
                {...(item.fit ? { fit: item.fit } : {})}
                {...(item.caption ? { caption: item.caption } : {})}
              />
            </ImageLightbox>
          ),
        )}
      </div>

      <div className="hidden sm:block">
        <MainMedia
          key={current.src}
          item={current}
          ratio={ratio}
          openLabel={openImageLabel}
          closeLabel={closeImageLabel}
        />

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setActive((i) => (i - 1 + images.length) % images.length)
            }
            aria-label={prevLabel}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-control border border-line text-ink hover:bg-subtle"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="flex flex-1 gap-2 overflow-x-auto">
            {images.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={thumbnailLabels[index]}
                aria-current={index === active ? "true" : undefined}
                className={`relative flex aspect-video w-24 flex-none items-center justify-center overflow-hidden rounded-control border ${
                  index === active
                    ? "border-2 border-ink"
                    : "border-line hover:border-ink"
                }`}
              >
                {item.kind === "video" ? (
                  <span className="flex h-full w-full items-center justify-center bg-subtle text-ink">
                    <PlayIcon />
                  </span>
                ) : (
                  <Image
                    src={item.src}
                    alt=""
                    width={96}
                    height={54}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % images.length)}
            aria-label={nextLabel}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-control border border-line text-ink hover:bg-subtle"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}
