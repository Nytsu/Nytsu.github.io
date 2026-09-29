/**
 * Brief section 9: every project page uses the same five sections, in this
 * order. Fixed, not per-project — the id list here is the single source of
 * truth for both the MDX body (`<Section id="problem">`) and the "on this
 * page" contents list, so the two can never drift out of sync.
 */
export const workSectionIds = [
  "problem",
  "what-i-built",
  "how-it-works",
  "results",
  "next",
] as const;

export type WorkSectionId = (typeof workSectionIds)[number];
