"use client";

import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 1v2M9 15v2M17 9h-2M3 9H1M14.8 3.2l-1.4 1.4M4.6 13.4l-1.4 1.4M14.8 14.8l-1.4-1.4M4.6 4.6 3.2 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15.5 10.5A6.5 6.5 0 0 1 7.5 2.5a6.5 6.5 0 1 0 8 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Brief section 8/12: light and dark already work via `prefers-color-scheme`
 * — this is just a manual override on top, using the `data-theme` hook
 * `globals.css` already has for exactly this ("no toggle control ships yet
 * ... the hook exists now so adding one later is a one-line change"). Resolves
 * brief section 12's open decision in favor of shipping it.
 *
 * Renders nothing until mounted: the resolved theme depends on `localStorage`
 * and `matchMedia`, neither available during server rendering, so rendering
 * a guess first (and correcting it after mount) would flash the wrong icon.
 * An inline script in the document head (see layout.tsx) sets the `data-theme`
 * attribute before first paint, so the page itself never flashes — only this
 * icon has a brief blank moment. */
export function ThemeToggle({
  lightLabel,
  darkLabel,
}: {
  lightLabel: string;
  darkLabel: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
  }, []);

  if (!theme) {
    return <div className="h-11 w-11 flex-none" aria-hidden="true" />;
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
        setTheme(next);
      }}
      aria-label={next === "dark" ? darkLabel : lightLabel}
      className="flex h-11 w-11 flex-none items-center justify-center rounded-control text-ink hover:bg-subtle"
    >
      {/* key forces a remount on every switch, replaying the fade-in —
       * same trick as the hero gallery's image crossfade. */}
      <span key={theme} className="animate-dialog-in">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}
