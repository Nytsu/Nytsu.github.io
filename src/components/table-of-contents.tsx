"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

/**
 * Brief section 6.7: sticky "on this page" list on wide screens, current
 * section marked with the accent dot. Scroll-spy via IntersectionObserver
 * rather than scroll-position math — cheaper, and naturally debounced by
 * the browser instead of a manual scroll listener. Always visible at `lg:`
 * — no collapse toggle, no visible "On this page" heading (kept only as an
 * `aria-label` on the landmark, for screen readers).
 *
 * Clicking a link smooth-scrolls via `scrollIntoView` rather than relying on
 * `html { scroll-behavior: smooth }` globally — that was tried and reverted
 * (see globals.css): it also smooth-scrolls Next.js's router-driven
 * scroll-to-top on navigation, which can visibly get stuck mid-scroll when
 * interrupted by the new page's layout settling in. Scoping it to these
 * specific clicks avoids touching route-level scrolling at all.
 * `scrollIntoView` respects each target's `scroll-margin-top` (Section's
 * `scroll-mt-32`), so it still clears the sticky nav correctly.
 */
export function TableOfContents({
  heading,
  overviewLabel,
  items,
  children,
}: {
  heading: string;
  overviewLabel: string;
  items: readonly TocItem[];
  children: ReactNode;
}) {
  const allItems = [{ id: "overview", label: overviewLabel }, ...items];
  // Starts at "" (nothing active) rather than "overview": overview is a
  // plain jump-to-top link, not a tracked scroll-spy section — it's the
  // short spec block right under the title, not a narrative section like
  // the rest, and its brief height made it an unreliable thing to track
  // (easy for a real section to win the same intersection check at nearly
  // the same scroll position). Only `items` (the five real sections) are
  // observed below.
  const [active, setActive] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: items is the fixed section list for this page, stable for its lifetime — re-running per render would just re-observe the same elements.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
      <aside
        className="sticky top-32 hidden self-start text-nav lg:block"
        aria-label={heading}
      >
        {allItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                const el = document.getElementById(item.id);
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                history.pushState(null, "", `#${item.id}`);
              }}
              aria-current={isActive ? "true" : undefined}
              className={`block rounded-control px-3 py-1.5 no-underline ${
                isActive
                  ? "bg-subtle font-semibold text-ink"
                  : "text-ink hover:bg-subtle"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </aside>
      <article>{children}</article>
    </div>
  );
}
