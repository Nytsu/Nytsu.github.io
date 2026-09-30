"use client";

import { useEffect, useState } from "react";
import { ReadingProgress } from "@/components/reading-progress";

/** Wires ReadingProgress to the actual document scroll position. Sticky
 * right under the nav (h-18 = 72px) so it reads as attached to it, matching
 * the tile's "progress line under the nav" placement without touching the
 * shared layout — only project pages render this. */
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
    <div className="sticky top-18 z-30 bg-bg">
      <ReadingProgress progress={progress} />
    </div>
  );
}
