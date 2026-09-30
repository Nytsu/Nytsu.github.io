"use client";

import Image from "next/image";
import { useState } from "react";

type BaseProps = {
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Breaks the image out to full viewport width regardless of the parent
   * Container's max-width, via the standard "left-1/2 + w-screen +
   * -translate-x-1/2" technique — an intentional exception to the brief's
   * one-container layout system (section 3), reserved for lead/hero images
   * specifically. Gallery figures inside case-study prose stay contained. */
  fullBleed?: boolean;
  /** Dims the image slightly (90% opacity) until the nearest `group`
   * ancestor is hovered or focused, then brightens to 100% — for a Figure
   * used as the visual inside a clickable gallery item (see ProjectGallery).
   * Opacity only, per brief section 7's motion rule. */
  interactive?: boolean;
};

type FigureProps =
  | ({ src: string; alt: string } & BaseProps)
  | ({ src?: undefined; alt?: undefined } & BaseProps);

/** Brief section 6.5: hairline border, square corners by default, caption in small
 * muted text that says plainly what the image shows. `ratio` is a real CSS
 * aspect-ratio value (e.g. "16/9", "4/3", "3/4") — set via inline style
 * rather than an arbitrary Tailwind class, since Tailwind can't generate a
 * utility for a value it only sees at runtime. `alt` is required whenever
 * `src` is given (brief section 8: meaningful alt text on every image);
 * omitting both renders an empty placeholder box for content that's known
 * to be missing a real photo, rather than inventing one.
 *
 * Shows a skeleton (Tailwind's animate-pulse — itself an opacity animation,
 * so it's already neutralized by the global prefers-reduced-motion rule)
 * while a real image loads, fading the image in once it has. */
export function Figure({
  src,
  alt,
  caption,
  ratio = "4/3",
  sizes = "(min-width: 1120px) 1120px, 100vw",
  priority = false,
  fullBleed = false,
  interactive = false,
}: FigureProps) {
  const [loaded, setLoaded] = useState(false);

  const imageOpacityClass = !loaded
    ? "opacity-0"
    : interactive
      ? "opacity-90 group-hover:opacity-100 group-focus-visible:opacity-100"
      : "opacity-100";

  return (
    <figure
      className={
        fullBleed ? "relative left-1/2 w-screen -translate-x-1/2" : undefined
      }
    >
      <div
        className={`relative overflow-hidden bg-subtle ${
          fullBleed ? "" : "rounded-img border border-line"
        } ${src && !loaded ? "animate-pulse" : ""}`}
        style={{ aspectRatio: ratio }}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={fullBleed ? "100vw" : sizes}
            priority={priority}
            onLoad={() => setLoaded(true)}
            className={`object-cover transition-opacity duration-300 ${imageOpacityClass}`}
          />
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-3 text-small text-muted ${fullBleed ? "px-6" : ""}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
