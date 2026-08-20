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

/** `links` is a list rather than a single `href`/`linkLabel` pair because an
 * entry can legitimately point at two different places: a case study on this
 * site and the live thing itself. Typed explicitly rather than inferred so the
 * shape doesn't collapse to "no links" the moment an entry lacks them. */
export type Project = {
  readonly title: string;
  readonly description: string;
  readonly links?: readonly { readonly label: string; readonly href: string }[];
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
    links: [
      { label: "View project", href: "/federation/" },
      { label: "View site", href: "https://fedesgrimapuertorico.org" },
    ],
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

// -----------------------------------------------------------------------------
// Fencing Federation project page (/federation/)
//
// This page exists for a specific reason: of everything in the portfolio, this
// is the closest thing to forward-deployed engineering. An external
// organisation, real operational systems, real stakeholders, a live season
// depending on it. That is the story this page has to tell.
//
// Role section: deliberately does not state an employment title (contractor,
// volunteer, staff) — Justin was explicit that the informal, undefined nature
// of the relationship should not be stated on the portfolio. What is stated
// instead is what actually happened: he was already involved with the
// federation's website, identified the operational problem himself, and built
// the fix. That is true, and it reads as more senior than any title would.
// -----------------------------------------------------------------------------

export const federationNav = [{ label: "← Home", href: "/" }] as const;

export const federationHero = {
  eyebrow: "Fencing Federation",
  title: "Member and event systems for a national federation",
  intro:
    "The registration, licensing, and member-management platform for Puerto Rico's fencing federation, built and maintained for an organisation that runs a competitive season on it.",
  tags: ["WordPress", "PHP", "Custom scripting", "Member systems"],
} as const;

export const federationOverview = {
  label: "01 / Overview",
  text: [
    "Puerto Rico's fencing federation licenses athletes, registers them for competition, and keeps the member records a national governing body is required to keep. I built the platform that does it, on WordPress: plugins where they fit, custom code where they did not.",
    "Unlike JustIn, this was not my product to define. The federation had existing obligations, existing categories, and an existing way of working, and the system had to fit those rather than replace them.",
  ],
} as const;

export const federationProblem = {
  label: "02 / Problem",
  text: "Before the platform, the federation ran on paper. Athletes filled out forms by hand, and the federation copied that information onto a spreadsheet. Every new season or event meant re-entering the same information again, with nothing connecting one record to the next.",
} as const;

export const federationRole = {
  label: "03 / Role",
  text: "I was already involved with the federation's website when I saw how much of their process was manual and repeated. I proposed a self-service platform and built it end to end: architecture, plugin selection, and the custom-scripted dashboard and registration flow.",
} as const;

export const federationConstraints = {
  label: "04 / Constraints",
  text: "The federation already paid for managed WordPress hosting on GoDaddy, but there was no budget for paid plugins on top of it. Everything had to be built inside what that subscription already covered. That is why the dashboard and the registration flow are custom-scripted, and why competition payments run through Forminator's free tier instead of a paid gateway add-on.",
} as const;

export const federationBuilt = {
  label: "05 / What I built",
  items: [
    "Athlete login and signup",
    "Athlete dashboard",
    "Digital athlete ID",
    "Registration and licensing",
    "Member records and management",
  ],
} as const;

/** Split per Justin's own account: the dashboard and the registration /
 *  inscription flow are custom-scripted into the page rather than off-the-shelf
 *  plugin behaviour; everything else runs on plugins. That split is worth
 *  keeping visible rather than flattening into one undifferentiated "custom
 *  plugins" line, since it's the more specific, more defensible claim in an
 *  interview.
 *  Hosting is GoDaddy managed WordPress, paid for by the federation before this
 *  project started. The budget constraint was on plugins, not the plan itself.
 *
 *  Forminator handles forms and competition payments on its free tier. Worth
 *  keeping the phrasing accurate: that piece was configured, not written, and
 *  claiming a hand-built payment integration is the kind of thing that falls
 *  apart in a follow-up question. The custom work is the dashboard and the
 *  registration flow, which is a strong enough claim on its own.
 *
 *  TODO — Justin: confirm the plugin is Forminator (WPMU DEV) rather than a
 *  similarly named one, and name any plugin you extended rather than just
 *  configured. */
export const federationStack = {
  label: "06 / Stack",
  items: [
    "WordPress",
    "GoDaddy managed hosting",
    "PHP",
    "MySQL",
    "Custom scripting (dashboard, registration)",
    "Forminator (forms, payments)",
  ],
} as const;

export const federationOutcome = {
  label: "07 / Outcome",
  text: "The platform is live, and athletes are actively registering on it. The most consistent feedback is about what it replaced: membership tied to one account, tournament registration without re-entering information, and a single dashboard for federation services. The digital athlete ID turned out to be the most requested piece after launch: proof, downloadable straight from an athlete's own account, that they are a currently registered competitive fencer in Puerto Rico.",
} as const;

/**
 * Screenshots come from Justin's own athlete account on the live platform, so
 * every record in them is his own. The redactions are his choice, not a
 * third-party obligation: the federative and FIE numbers encode his date of
 * birth, so both were removed before publishing.
 *
 * Ordered as the athlete journey rather than as a feature list: create an
 * account, sign in, land on the dashboard, pull up the ID, register for a
 * competition. That sequence is the argument for the platform.
 *
 * Sources are edited, not raw captures. Browser chrome was cropped off the
 * dashboard, and the FIE number and expiry bleeding past the ID modal were
 * removed by rebuilding the background gradient underneath. Originals are NOT
 * kept in public/ on purpose: anything under public/ is copied into dist/ and
 * published, which would have defeated the redaction entirely.
 */
export const federationFigures = {
  label: "08 / Screenshots",
  intro:
    "The athlete-facing side of the platform, in the order an athlete meets it: account creation, sign-in, the dashboard, the digital ID, and competition registration.",
  figures: [
    {
      src: "/images/federation/signup.png",
      alt: "The account creation form, collecting first name, paternal and maternal surnames, email, date of birth, and a password with confirmation.",
      caption: "Account signup",
      ratio: "1600 / 910",
    },
    {
      src: "/images/federation/login.png",
      alt: "The federation login screen: email and password fields, a keep-me-signed-in checkbox, a forgotten-password link, and a link to create an account.",
      caption: "Login",
      ratio: "1600 / 908",
    },
    {
      src: "/images/federation/dashboard.png",
      alt: "An athlete dashboard showing federative membership and FIE licence status with expiry dates, club, weapon, category, and account type, plus shortcuts to edit the profile and register for competitions.",
      caption: "Athlete dashboard",
      ratio: "1600 / 911",
    },
    {
      src: "/images/federation/dashboard-id.png",
      alt: "The digital athlete ID open over the dashboard as a card: photo, name, club, season and expiry date, with options to flip the card and download it as a PDF.",
      caption: "Digital athlete ID",
      ratio: "1600 / 915",
    },
    {
      src: "/images/federation/competition-registration.png",
      alt: "The competition registration screen listing open national and international events, filterable by weapon and status, each with its own registration button and closing date.",
      caption: "Competition registration",
      ratio: "1600 / 913",
    },
  ],
} as const;
