/**
 * CV experience entries. Content, not UI chrome, so it lives here rather
 * than in messages/en.json — same reasoning as project data living in MDX.
 *
 * TODO carried over from the old site: the INprende end date ("2023 –
 * 2026") was flagged as unconfirmed before shipping. Still unconfirmed —
 * check with Justin before this goes live.
 */
export const experience = [
  {
    company: "Nytsu",
    role: "Founder",
    period: "2025 – Present",
    line: "Building JustIn end-to-end across hardware, firmware, mobile software, and product.",
  },
  {
    company: "INprende",
    role: "Software Developer",
    period: "2023 – 2026",
    line: "Built full-stack products for institutional and government clients, including AI-powered internal tooling.",
  },
  {
    company: "The Walt Disney Company",
    role: "Disney College Program",
    period: "2022",
    line: "Guest operations at Disney's Hollywood Studios.",
  },
  {
    company: "SMX Services & Consulting",
    role: "Web Development Consultant",
    period: "2021 – 2022",
    line: "Built full-stack features for an insurance underwriting platform.",
  },
] as const;
