"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

/**
 * Brief section 6.7: sticky "on this page" list on wide screens, current
 * section marked with the accent dot. Scroll-spy via IntersectionObserver
 * rather than scroll-position math — cheaper, and naturally debounced by
 * the browser instead of a manual scroll listener.
 */
export function TableOfContents({
  heading,
  overviewLabel,
  items,
}: {
  heading: string;
  overviewLabel: string;
  items: readonly TocItem[];
}) {
  const allItems = [{ id: "overview", label: overviewLabel }, ...items];
  const [active, setActive] = useState("overview");

  // biome-ignore lint/correctness/useExhaustiveDependencies: allItems is the fixed section list for this page, stable for its lifetime — re-running per render would just re-observe the same elements.
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

    for (const item of allItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="sticky top-32 hidden self-start text-nav lg:block"
      aria-label={heading}
    >
      <p className="mb-3 text-small text-muted">{heading}</p>
      {allItems.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`relative block border-l py-1.5 pl-3 ${
              isActive
                ? "border-accent font-semibold text-ink"
                : "border-line text-ink hover:border-ink"
            }`}
          >
            {isActive && (
              <span
                aria-hidden="true"
                className="-left-[3.5px] absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
              />
            )}
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
