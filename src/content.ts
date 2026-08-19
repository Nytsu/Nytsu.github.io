/**
 * Every word on the site lives here.
 *
 * Nothing is hardcoded in the components, so updating the portfolio is a data
 * edit rather than a code change. That is what lets this stay current as the
 * founder role becomes the primary one.
 *
 * Voice (brand-guidelines.md section 7): short declarative sentences. State what
 * was built and what happened. No "passionate", "leverage", "seamless",
 * "empower", "journey", "unlock". No exclamation points.
 *
 * Items marked TODO need Justin's input before this goes public.
 */

/** A run of copy with exactly one accented word. One accent per view. */
export type AccentedText = {
  readonly before: string;
  readonly accent: string;
  readonly after: string;
};

/** Shared so the résumé link is identical wherever it appears (Experience, Contact). */
export const resumeHref = "/justin-de-la-cruz-resume.pdf";

// -----------------------------------------------------------------------------
// Homepage
// -----------------------------------------------------------------------------

export const hero = {
  name: "Justin J. De La Cruz",
  tagline: "Software Engineer · Founder",
  positioning: {
    before:
      "I build software and hardware products from idea to working prototype. Currently building ",
    accent: "JustIn",
    after: ", a wireless scoring system for competitive fencing.",
  } satisfies AccentedText,
} as const;

/** The one project that gets case-study depth — as an introduction only. The
 * technical depth lives on its own page (see the `justin*` exports below). */
export const featured = {
  label: "01 / Selected work",
  title: "JustIn",
  summary:
    "Wireless scoring & performance measurement for competitive fencing.",
  description:
    "A hardware-software system I'm building end-to-end, from embedded hardware and firmware to the mobile app and product design.",
  tags: ["Hardware", "Firmware", "React Native", "Bluetooth LE"],
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
export const projects = [
  {
    title: "Fencing Federation Platform",
    description:
      "Registration and member-management platform for a national fencing federation.",
    // TODO — Justin: add a short tags line here if you want the stack shown
    // ("Technology can be shown briefly" per the brief) — left out rather than
    // guessed.
  },
  {
    title: "Earlier / Selected Engineering Work",
    description:
      "Selected earlier work: a two-way firewall and network security capstone, a NASA Space Apps Challenge project, and other engineering projects.",
    href: "https://github.com/Nytsu",
    linkLabel: "View on GitHub",
  },
] as const;

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
    period: "2025 — Present",
    line: "Building JustIn end-to-end across hardware, firmware, mobile software, and product.",
  },
  {
    company: "INprende",
    role: "Software Developer",
    period: "2023 — 2026",
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
    period: "2021 — 2022",
    line: "Built full-stack features for an insurance underwriting platform.",
  },
] as const;

export const currently = {
  label: "03 / Currently",
  text: "Currently building JustIn through real-world testing and exploring opportunities where software, physical systems, AI, and product development intersect.",
} as const;

export const contact = {
  intro:
    "Open to conversations about hardware-adjacent product work and about JustIn.",
  email: { user: "justinjdelacruz", domain: "outlook.com" },
  links: [
    // TODO — Justin: replace with your real LinkedIn URL.
    { label: "LinkedIn", href: "https://www.linkedin.com/in/justinjdelacruz" },
    { label: "GitHub", href: "https://github.com/Nytsu" },
    // TODO — Justin: drop the PDF at public/justin-de-la-cruz-resume.pdf.
    { label: "Résumé", href: resumeHref },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
    "A hardware-software system I'm building end-to-end — from embedded hardware and firmware to the mobile app, backend, and product design.",
  tags: ["Hardware", "Firmware", "React Native", "Bluetooth LE"],
} as const;

export const justinOverview = {
  label: "01 / Overview",
  text: [
    "JustIn is a wireless scoring and performance-measurement system for competitive fencing — hardware, firmware, mobile app, backend, and product design, built end-to-end as the flagship product of my company, Nytsu.",
    "Fencing scoring hasn't meaningfully changed in decades: a wired box scores a bout and nothing else. JustIn keeps the accuracy fencers already trust and adds what's missing — no wires, and a record of how a fencer actually fenced.",
  ],
} as const;

export const justinProblem = {
  label: "02 / Problem",
  text: "Current scoring systems are expensive, wired, and generally do not provide meaningful historical performance data. A wired scoring box costs $1,500 to $3,000 a strip and tethers both fencers to the floor. None of them record anything — a fencer finishes a season with no data about how they actually fenced.",
} as const;

export const justinArchitecture = {
  label: "03 / Architecture",
  pipeline: [
    "Fencing weapon / sensor",
    "ESP32",
    "Bluetooth Low Energy",
    "Mobile application",
    "Backend",
    "Data / analytics",
  ],
  text: "Each fencer wears an ESP32 unit that talks Bluetooth Low Energy directly to a phone — no router, no strip wiring, no external infrastructure. The phone resolves scoring in real time and syncs bout data to the backend, where it becomes the historical record wired boxes never kept.",
} as const;

export const justinHardware = {
  label: "04 / Hardware",
  items: [
    "ESP32",
    "Embedded systems",
    "Firmware",
    "Bluetooth Low Energy",
    "Capacitive sensing",
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

export const justinVirtualGround = {
  label: "06 / VirtualGround",
  text: "Épée touches are resolved with VirtualGround: capacitive sensing on the defender's guard, correlated against the attacker's hit event on the phone. It exists because wireless épée scoring still has to answer the sport's core question — who touched first — without a wired, grounded strip to arbitrate it.",
} as const;

/**
 * This is the section a recruiter will trust or distrust the rest of the page
 * on. Do not exaggerate it into a production or app-store deployment — it was
 * a single real-world field test on a prototype. TODO entries below need
 * Justin's actual, factual account of what happened; do not fill them with
 * generic claims.
 */
export const justinFieldTest = {
  label: "07 / Live field test",
  summary:
    "Conducted a two-hour live field test with fencing instructors and club members, running the entire class using JustIn's scoring system. All bouts ran successfully, while the test surfaced concrete improvements for the next iteration.",
  detail: [
    {
      label: "Tested",
      text: "Whether JustIn's scoring — hit detection, touch resolution, and the app itself — could run a real class end to end, in place of the club's usual wired boxes.",
    },
    {
      label: "Setup",
      text: "An iPad running the JustIn app at Justin's own fencing club. Instructors and club members fenced full bouts on it for the entire two-hour class. Not an app-store release — a controlled, in-person test on a working prototype.",
    },
    {
      label: "What worked",
      text: "TODO — Justin: what specifically ran cleanly (e.g. hit detection accuracy, latency, battery life across the session). Be concrete.",
    },
    {
      label: "What didn't",
      text: "TODO — Justin: the actual failure modes from the test — false touches, connection drops, UI friction, whatever it was. Specifics, not generalities.",
    },
    {
      label: "Learned",
      text: "TODO — Justin: what changed in your understanding of the problem after watching real fencers use it.",
    },
    {
      label: "Feedback",
      text: "TODO — Justin: what instructors and club members said, quoted or paraphrased.",
    },
    {
      label: "Next test",
      text: "TODO — Justin: what specifically changes before the second field test, based on this one.",
    },
  ],
} as const;

export const justinNext = {
  label: "08 / Next",
  items: [
    "Second field test",
    "Analytics layer",
    "Further hardware refinement",
    "FCC / CE certification",
    "Paid club pilots",
  ],
} as const;
