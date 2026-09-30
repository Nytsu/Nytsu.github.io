"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/button";

export type TimelineMilestone = {
  date: Date;
  label: string;
  future?: boolean;
};

function monthsBetween(a: Date, b: Date) {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  );
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Brief section 6.4: the one memorable element on the site. A thin line with
 * monthly ticks and taller year ticks, milestone markers (filled = past,
 * hollow ring = future), labels alternating above/below by index parity,
 * the last one right-aligned so its label doesn't run off the edge.
 *
 * Draws itself once on mount via a key-driven remount (the idiomatic React
 * way to force a CSS animation to restart), and can be replayed. Data-driven
 * from `milestones` — no positions are hand-tuned per project.
 */
export function Timeline({
  milestones,
  replayLabel,
}: {
  milestones: readonly TimelineMilestone[];
  replayLabel: string;
}) {
  const [playKey, setPlayKey] = useState(0);

  const start = milestones[0]?.date;
  const end = milestones[milestones.length - 1]?.date;
  if (!start || !end) return null;

  const totalMonths = Math.max(1, monthsBetween(start, end));

  const ticks = Array.from({ length: totalMonths + 1 }, (_, i) => ({
    i,
    left: (i / totalMonths) * 100,
    isJanuary: addMonths(start, i).getMonth() === 0,
  }));

  const years = ticks
    .filter((t) => t.i === 0 || t.isJanuary)
    .map((t) => ({ left: t.left, year: addMonths(start, t.i).getFullYear() }));

  return (
    <div>
      <div className="overflow-x-auto pt-2">
        <div key={playKey} className="relative mx-2 h-[310px] min-w-[860px]">
          <div className="absolute inset-x-0 top-[150px] h-px origin-left animate-tl-draw bg-ink" />

          <div className="absolute inset-x-0 top-[150px] h-0 animate-tl-fade">
            {ticks.map((t) => (
              <i
                key={t.i}
                aria-hidden="true"
                className={
                  t.isJanuary
                    ? "absolute top-[-9px] h-[18px] w-px bg-ink"
                    : "absolute top-[-4px] h-2 w-px bg-muted opacity-55"
                }
                style={{ left: `${t.left}%` }}
              />
            ))}
          </div>

          {years.map((y) => (
            <span
              key={y.year}
              className="absolute top-[166px] -translate-x-1/2 animate-tl-fade text-label text-muted"
              style={{ left: `${y.left}%` }}
            >
              {y.year}
            </span>
          ))}

          {milestones.map((m, index) => {
            const left = (monthsBetween(start, m.date) / totalMonths) * 100;
            const up = index % 2 === 0;
            const edge = index === milestones.length - 1;
            const delayStyle = { "--tl-delay": `${900 + index * 170}ms` } as {
              [key: string]: string;
            };

            return (
              <div
                key={`${m.date.toISOString()}-${m.label}`}
                className="absolute top-[150px] w-0"
                style={{ left: `${left}%` }}
              >
                <span
                  aria-hidden="true"
                  style={delayStyle}
                  className={`absolute animate-tl-fade-mark rounded-full opacity-0 ${
                    m.future
                      ? "-left-[7px] -top-[7px] h-3.5 w-3.5 border-2 border-accent bg-bg"
                      : "-left-1.5 -top-1.5 h-3 w-3 bg-accent"
                  }`}
                />
                <span
                  aria-hidden="true"
                  style={delayStyle}
                  className={`absolute w-px animate-tl-fade-mark bg-line opacity-0 ${
                    up ? "bottom-1.5 h-14" : "top-1.5 h-[76px]"
                  }`}
                />
                <div
                  style={delayStyle}
                  className={`absolute w-[150px] animate-tl-fade-mark text-small opacity-0 ${
                    up ? "bottom-[66px]" : "top-[92px]"
                  } ${edge ? "right-[-10px] left-auto text-right" : "left-[-10px]"}`}
                >
                  <b className="block font-semibold text-ink">
                    {formatMonthYear(m.date)}
                  </b>
                  <span className="text-muted">{m.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPlayKey((k) => k + 1)}
        className={`${buttonClasses("ghost")} mt-2`}
      >
        {replayLabel}
      </button>
    </div>
  );
}
