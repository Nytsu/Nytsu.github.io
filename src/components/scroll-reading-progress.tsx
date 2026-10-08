"use client";

import { useEffect, useState } from "react";
import { ReadingProgress } from "@/components/reading-progress";

/** Wires ReadingProgress to the actual document scroll position. Sticky
 * right under the nav (h-18 = 72px) so it reads as attached to it, matching
 * the tile's "progress line under the nav" placement without touching the
 * shared layout — only project pages render this.
 *
 * `pt-1.5` opens a small gap before the track, so ReadingProgress's dot
 * (centered on the track, half of it above) doesn't reach back up into
 * the sticky nav header above this. Padding, specifically, not margin:
 * a margin-top on the track collapses through into this element (no
 * padding/border of its own to stop it), and since this wrapper is
 * `sticky`, a collapsed margin doesn't shift its *stuck* position at all
 * — confirmed by measuring it, not assumed; it silently did nothing. A
 * z-index bump was also tried first for the clipping itself, which
 * didn't work either — two independently `sticky` elements don't
 * reliably respect z-index where they overlap, so removing the overlap
 * (this gap) was the only fix that actually held up. */
export function ScrollReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="sticky top-18 z-30 bg-bg pt-1.5">
      <ReadingProgress progress={progress} />
    </div>
  );
}
