"use client";

import Image from "next/image";
import { useState } from "react";

type BaseProps = {
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Full viewport width past the Container's max-width — an intentional
   * exception to brief section 3's one-container layout, reserved for
   * lead/hero images. Gallery figures inside case-study prose stay
   * contained. */
  fullBleed?: boolean;
  /** For a Figure used as a gallery item's visual (see ProjectGallery) —
   * opacity-only, per brief section 7's motion rule. */
  interactive?: boolean;
  /** "cover" (default) fills the frame, cropping to match `ratio`. "contain"
   * fits the whole image instead — flush with the frame when it already
   * matches `ratio`, letterboxed on `bg-bg` only when it doesn't. */
  fit?: "cover" | "contain";
  /** Overrides the "contain" letterbox's `bg-bg` with a fixed color that
   * doesn't switch with light/dark mode — for a render or icon shot
   * against a deliberately fixed backdrop (brief section 6.6's "plain
   * background, consistent lighting"), as opposed to a theme-matched
   * backing that keeps a genuinely transparent image invisible against
   * the page. Ignored when `fit` isn't "contain". */
  background?: string;
};

type FigureProps =
  | ({ src: string; alt: string } & BaseProps)
  | ({ src?: undefined; alt?: undefined } & BaseProps);

/** Brief section 6.5. `ratio` sets inline since Tailwind can't generate a
 * utility for a value it only sees at runtime. `alt` is required with `src`;
 * omitting both renders a placeholder instead of inventing an image. The
 * loading skeleton (`animate-pulse`) is already neutralized by
 * `prefers-reduced-motion`. */
export function Figure({
  src,
  alt,
  caption,
  ratio = "4/3",
  sizes = "(min-width: 1120px) 1120px, 100vw",
  priority = false,
  fullBleed = false,
  interactive = false,
  fit = "cover",
  background,
}: FigureProps) {
  const [loaded, setLoaded] = useState(false);

  const imageOpacityClass = !loaded
    ? "opacity-0"
    : interactive
      ? "opacity-90 group-hover:opacity-100 group-focus-visible:opacity-100"
      : "opacity-100";

  const frame = (
    <div
      className={`relative overflow-hidden bg-subtle ${
        fullBleed ? "" : "rounded-img border border-line"
      } ${src && !loaded ? "animate-pulse" : ""}`}
      style={{ aspectRatio: ratio }}
    >
      {src && (
        // `bg-bg` backs "contain"'s own letterboxing so a mismatched image
        // doesn't show the frame's `bg-subtle` through its gaps; `background`
        // overrides that token with a fixed color when one is given.
        <div
          className={
            fit === "contain"
              ? background
                ? "absolute inset-0"
                : "absolute inset-0 bg-bg"
              : "absolute inset-0"
          }
          style={fit === "contain" && background ? { background } : undefined}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={fullBleed ? "100vw" : sizes}
            priority={priority}
            onLoad={() => setLoaded(true)}
            className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-300 ${imageOpacityClass}`}
          />
        </div>
      )}
    </div>
  );

  return (
    <figure
      className={
        fullBleed ? "relative left-1/2 w-screen -translate-x-1/2" : undefined
      }
    >
      {frame}
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
