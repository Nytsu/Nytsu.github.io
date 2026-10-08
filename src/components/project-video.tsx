"use client";

import { useEffect, useState } from "react";

/** Plain HTML5 video with visible controls. `preload="metadata"` avoids
 * pulling the full file until it's actually needed.
 *
 * `autoPlay` is opt-in per caller — brief section 2 lists autoplay video as
 * something to avoid, so most uses (and every one in body prose) stay
 * paused until the viewer presses play. Where a caller does opt in (a short,
 * silent clip that becomes the active item in a gallery, not something
 * playing on page load), this still checks `prefers-reduced-motion` itself:
 * that preference governs video playback, not just CSS animation, and
 * nothing else in the codebase gates JS-driven motion on it. Autoplay
 * requires `muted` — browsers block unmuted autoplay outright. */
export function ProjectVideo({
  src,
  ratio = "16/9",
  caption,
  autoPlay = false,
}: {
  src: string;
  ratio?: string;
  caption?: string;
  autoPlay?: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const shouldAutoPlay = autoPlay && !reducedMotion;

  return (
    <figure>
      <div
        className="overflow-hidden rounded-img border border-line bg-subtle"
        style={{ aspectRatio: ratio }}
      >
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          autoPlay={shouldAutoPlay}
          muted={shouldAutoPlay}
          className="h-full w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-small text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
