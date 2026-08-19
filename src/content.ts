/**
 * Every word on the site lives here.
 *
 * Nothing is hardcoded in the components, so updating the portfolio is a data
 * edit rather than a code change. That is what lets this stay current as the
 * founder role becomes the primary one.
 *
 * Voice (brand-guidelines.md section 7): short declarative sentences. State what
 * was built and what happened. No "passionate", "leverage", "seamless",
 * "empower", "journey", "unlock". No exclamation points. No em dashes: use a
 * comma, colon, period, or parentheses instead, whichever the sentence calls for.
 *
 * Items marked TODO need Justin's input before this goes public.
 */

/** A run of copy with exactly one accented word. One accent per view. */
export type AccentedText = {
  readonly before: string;
  readonly accent: string;
  readonly after: string;
};

/** `href`/`linkLabel` are optional so a compact work entry can go either way —
 * some link out, some don't. Typed explicitly rather than inferred so the
 * shape doesn't collapse to "no link" the moment every current entry lacks one. */
export type Project = {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly linkLabel?: string;
};

/** Shared so the résumé link is identical wherever it appears (Experience, Contact). */
export const resumeHref = "/justin-de-la-cruz-resume.pdf";

/** Single source of truth for the two outbound social URLs — referenced from
 * the hero's quick links, the top nav, and the contact list. Not exported:
 * every consumer lives in this file. */
const social = {
  github: "https://github.com/Nytsu",
  linkedin: "https://linkedin.com/in/justinjdelacruz",
} as const;

/** JustIn's own product site — distinct from the case-study page at /justin/
 * on this portfolio. The hero's accent word links out here; "View project →"
 * on the work section links to the case study instead. */
export const justinUrl = "https://justinfencing.com";

// -----------------------------------------------------------------------------
// Homepage
// -----------------------------------------------------------------------------

export const hero = {
  name: "Justin J. De La Cruz",
  tagline: "Software Developer · Founder",
  positioning: {
    before:
      "I build software and hardware products from idea to working prototype. Currently building ",
    accent: "JustIn",
    after:
      ", wireless scoring and performance measurement technology for competitive fencing.",
  } satisfies AccentedText,
  /** Quiet quick links under the positioning line — not a second nav, just
   * the fastest path to the two places people actually want to go from here. */
  links: [
    { label: "Work", href: "#work" },
    { label: "GitHub", href: social.github },
    { label: "LinkedIn", href: social.linkedin },
  ],
} as const;

/** The one project that gets case-study depth — as an introduction only. The
 * technical depth lives on its own page (see the `justin*` exports below). */
export const featured = {
  label: "01 / Selected work",
  title: "JustIn",
  summary:
    "Wireless scoring and performance measurement for competitive fencing.",
  description:
    "A hardware-software system I'm building end-to-end, from embedded hardware and firmware to the mobile app and product design.",
  tags: ["Hardware", "Firmware", "Mobile", "Wireless"],
  href: "/justin/",
} as const;

/**
 * Lighter treatment than JustIn — one entry each, no case-study depth. Keeps
 * the site from reading as a single-project portfolio without diluting the
 * thing that matters most.
 *
 * `href` is present only where there is enough material for its own project
 * page; its absence is a deliberate editorial choice, not an oversight.
 */
export const projects: readonly Project[] = [
  {
    title: "Puerto Rico's Fencing Federation Platform",
    description:
      "Registration, licensing, event entry, and member-management systems for a national fencing federation, built on WordPress with custom plugins and code.",
    href: "https://fedesgrimapuertorico.org",
    linkLabel: "View site",
  },
];

/**
 * TODO — Justin: the INprende dates are a placeholder end year — confirm
 * "2023 — 2026" is right before this ships.
 *
 * Keep to the shape the guidelines specify (section 8.4): company, role, one
 * sentence. NDA-safe lines only — no case-study depth on employer work, no
 * client names you are not free to state, no metrics you cannot publish.
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

export const about = {
  label: "03 / About",
  paragraphs: [
    "I'm a software developer and founder working across software, hardware, and product development. I also compete in fencing, which led directly to JustIn. I saw a problem in a sport I know deeply and decided to build the technology I wanted to exist.",
    "I enjoy taking ambiguous problems, building complete systems, testing them with real people, and using what I learn to build the next version.",
  ],
} as const;

export const contact = {
  intro:
    "Interested in hardware-software products, athletic technology, AI, or founder journeys?",
  email: { user: "justinjdelacruz", domain: "outlook.com" },
  links: [
    { label: "LinkedIn", href: social.linkedin },
    { label: "GitHub", href: social.github },
    // TODO — Justin: drop the PDF at public/justin-de-la-cruz-resume.pdf.
    { label: "Résumé", href: resumeHref },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "GitHub", href: social.github },
  { label: "Résumé", href: resumeHref },
] as const;

// -----------------------------------------------------------------------------
// JustIn project page (/justin/) — the technical depth that used to live on
// the homepage. Numbers are embedded in each `label`, same convention as the
// homepage section labels above.
// -----------------------------------------------------------------------------

export const justinNav = [{ label: "← Home", href: "/" }] as const;

export const justinHero = {
  eyebrow: "JustIn",
  title: "Wireless scoring for competitive fencing",
  intro:
    "A hardware-software system I'm building end-to-end, from embedded hardware and firmware to the mobile app, backend, and product design.",
  tags: ["Hardware", "Firmware", "React Native", "Bluetooth LE"],
} as const;

export const justinOverview = {
  label: "01 / Overview",
  text: [
    "JustIn is a wireless scoring and performance-measurement system for competitive fencing: hardware, firmware, mobile app, backend, and product design, built end-to-end as the flagship product of my company, Nytsu.",
    "Fencing scoring hasn't meaningfully changed in decades: a wired box scores a bout and nothing else. JustIn keeps the accuracy fencers already trust and adds what's missing: no wires, and a record of how a fencer actually fenced.",
  ],
} as const;

export const justinProblem = {
  label: "02 / Problem",
  text: "Current scoring systems are expensive, wired, and generally do not provide meaningful historical performance data. A wired scoring box costs $1,500 to $3,000 a strip and tethers both fencers to the floor. None of them record anything: a fencer finishes a season with no data about how they actually fenced.",
} as const;

export const justinArchitecture = {
  label: "03 / System",
  pipeline: [
    "Fencing weapon / sensor",
    "Microcontroller",
    "Bluetooth Low Energy",
    "Mobile application",
    "Backend",
    "Data / analytics",
  ],
  text: [
    "Each fencer wears a microcontroller unit that talks Bluetooth Low Energy directly to a phone: no router, no strip wiring, no external infrastructure. The phone resolves scoring in real time and syncs bout data to the backend, where it becomes the historical record wired boxes never kept.",
    "Épée touches are resolved with VirtualGround, proprietary sensing on the defender's guard correlated against the attacker's hit event on the phone. It exists because wireless épée scoring still has to answer the sport's core question (who touched first) without a wired, grounded strip to arbitrate it.",
  ],
} as const;

export const justinHardware = {
  label: "04 / Hardware",
  items: [
    "Microcontrollers",
    "Embedded systems",
    "Firmware",
    "Bluetooth Low Energy",
    "Proprietary sensing",
    "Enclosure / 3D printing",
  ],
} as const;

export const justinSoftware = {
  label: "05 / Software",
  items: [
    "React Native / Expo",
    "TypeScript",
    "Node.js / Express backend",
    "PostgreSQL",
  ],
} as const;

/**
 * This is the section a recruiter will trust or distrust the rest of the page
 * on. Do not exaggerate it into a production or app-store deployment — it was
 * a single real-world field test on a prototype.
 *
 * `detail` deliberately holds only what is factually known (what was tested,
 * how it was set up). The rest — what worked, what didn't, what was learned,
 * what instructors said — needs Justin's actual account before it can go on
 * the page; shipping it as TODO text would have been worse than leaving it
 * out, so it's out until there is a real, specific answer for each.
 */
export const justinFieldTest = {
  label: "06 / Field test",
  summary:
    "In August 2026, I conducted a two-hour live field test with fencing instructors and club members, running the entire class using JustIn's scoring system. The system operated successfully throughout the session, while the test surfaced concrete improvements for the next iteration.",
  detail: [
    {
      label: "Tested",
      text: "Whether JustIn's scoring (hit detection, touch resolution, and the app itself) could run a real class end to end, in place of the club's usual wired boxes.",
    },
    {
      label: "Setup",
      text: "An iPad running the JustIn app at Justin's own fencing club. Instructors and club members fenced full bouts on it for the entire two-hour class. Not an app-store release: a controlled, in-person test on a working prototype.",
    },
  ],
} as const;

export const justinNext = {
  label: "07 / Next",
  items: [
    "Second field test",
    "Analytics layer",
    "Further hardware refinement",
    "FCC / CE certification",
    "Paid club pilots",
  ],
} as const;
