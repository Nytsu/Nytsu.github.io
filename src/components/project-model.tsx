"use client";

import { useEffect } from "react";

/** A 3D model viewer in the same hairline frame as Figure, but on a white
 * background rather than the usual bg-subtle — this model is itself gray
 * and white, which read poorly against a gray frame. User-controlled
 * rotation only (camera-controls, no auto-rotate) — an auto-spinning
 * model is the same kind of ambient motion brief section 7 rules out for
 * autoplay video.
 *
 * The library touches browser-only globals as soon as it's imported, which
 * breaks static prerendering (a Node environment, no `navigator`) — the
 * import has to run after mount, in the actual browser, not at module
 * load time. */
export function ProjectModel({
  src,
  alt,
  ratio = "4/3",
  caption,
}: {
  src: string;
  alt: string;
  ratio?: string;
  caption?: string;
}) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <figure>
      <div
        className="overflow-hidden rounded-img border border-line bg-bg"
        style={{ aspectRatio: ratio }}
      >
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          style={{ width: "100%", height: "100%" }}
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
