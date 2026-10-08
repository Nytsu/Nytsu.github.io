"use client";

import Image from "next/image";
import { Children, type ReactElement, type ReactNode, useState } from "react";
import { ChevronIcon } from "@/components/chevron-icon";
import { ImageLightbox } from "@/components/image-lightbox";

type PhoneScreenProps = { src: string; alt: string; caption?: string };

/** A single screen inside `PhoneGallery` — never rendered on its own.
 * `PhoneGallery` reads each child's props to build its item list, so the
 * screens are written as plain MDX children with string attributes rather
 * than a JS array prop: next-mdx-remote/rsc doesn't pass JSX
 * expression-container attributes (`items={...}`) through to custom
 * components at all — confirmed directly, even `items={5}` arrives as
 * `undefined`. Every other component in this codebase only ever uses plain
 * string attributes for exactly this reason. */
export function PhoneScreen(_props: PhoneScreenProps) {
  return null;
}

/** A small, fixed-width phone silhouette for app screenshots, swapped with
 * prev/next arrows (the same crossfade as HeroGallery's active-item switch).
 * Not `Figure`: a phone's corner radius has nothing to do with brief
 * section 3's per-element-type rule (images get `--img-radius`, controls
 * get `--control-radius`) — this is drawing a device, not framing a photo,
 * same reasoning as the About page's circular portrait. Tapping the screen
 * opens the same full-size `ImageLightbox` used everywhere else — at a
 * fixed 224px wide, the screenshot's own UI text is otherwise too small to
 * read. */
export function PhoneGallery({
  children,
  prevLabel,
  nextLabel,
  openLabel,
  closeLabel,
}: {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const items = Children.toArray(children).map(
    (child) => (child as ReactElement<PhoneScreenProps>).props,
  );
  const [active, setActive] = useState(0);
  const current = items[active] as PhoneScreenProps;

  const goPrev = () => setActive((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setActive((i) => (i + 1) % items.length);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-56 overflow-hidden rounded-[28px] border border-line bg-subtle"
        style={{ aspectRatio: "1206/2622" }}
      >
        <ImageLightbox
          src={current.src}
          alt={current.alt}
          openLabel={openLabel}
          closeLabel={closeLabel}
          width={1206}
          height={2622}
          onPrev={goPrev}
          onNext={goNext}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          imageClassName="rounded-[28px]"
          {...(current.caption ? { caption: current.caption } : {})}
        >
          {/* Keyed so the crossfade replays per switch — a leaf-level key,
           * not on the Dialog itself, so cycling screens from inside an
           * open lightbox doesn't unmount (and close) it. */}
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="224px"
            className="animate-gallery-fade object-cover"
          />
        </ImageLightbox>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label={prevLabel}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-control border border-line text-ink hover:bg-subtle"
        >
          <ChevronIcon direction="left" />
        </button>

        {current.caption && (
          <span className="min-w-32 text-center text-small text-muted">
            {current.caption}
          </span>
        )}

        <button
          type="button"
          onClick={goNext}
          aria-label={nextLabel}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-control border border-line text-ink hover:bg-subtle"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
