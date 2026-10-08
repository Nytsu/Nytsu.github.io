import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/work");

/** Brief section 9's content model. `cover` is optional: some projects don't
 * have a real photo yet, and Figure renders a clean placeholder rather than
 * a fabricated image when it's missing. */
export type WorkTeamMember = {
  name: string;
  role: string;
  /** Supplied explicitly rather than derived from `name` — splitting an
   * arbitrary name into initials is unreliable for compound surnames (e.g.
   * "Justin J De La Cruz" naively gives "JC", dropping "De La" entirely),
   * and guessing wrong is its own small way of getting someone's identity
   * wrong, which brief section 10's "never invent facts" spirit covers too. */
  initials: string;
  /** An org's real logo, or a person's real photo, shown instead of
   * initials when present. Decorative (the name is already announced
   * alongside it), so no alt text needed. */
  avatar?: string;
  /** "contain" (default) is right for a logo — padded, on a fixed white
   * chip so a logo drawn for a white background doesn't wash out in dark
   * mode. "cover" fills the circle edge to edge instead, for a real photo
   * that's already meant to be cropped tight. */
  avatarFit?: "contain" | "cover";
};

/** A still image, or a short user-controlled clip (`kind: "video"` — brief
 * section 7 bars autoplay, not video itself). */
export type WorkGalleryItem =
  | {
      kind?: "image";
      src: string;
      alt: string;
      caption?: string;
      /** "cover" (default) crops the image to the hero's shared ratio —
       * right for most photos. "contain" shows the whole frame instead,
       * letterboxed on `bg-bg`, for a shot whose composition already uses
       * its full width and loses something meaningful when cropped. */
      fit?: "cover" | "contain";
    }
  | { kind: "video"; src: string; caption?: string };

export type WorkFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  status: string;
  builtWith: string[];
  year: string;
  order: number;
  cover?: { src: string; alt: string; caption?: string };
  /** A tighter, pre-cropped alternative to `cover` for the home page index
   * row only (brief section 6.3's small square thumbnail). `cover` itself
   * stays framed for the project page's wide, cropped hero — a render or
   * app icon with a lot of empty canvas around the subject reads as mostly
   * dead space at thumbnail size, so this points at a version cropped
   * tight to the subject instead. Omitted (most projects) and the index
   * row just uses `cover`. */
  thumbnail?: { src: string; alt: string; background?: string };
  /** Extra media shown alongside `cover` in the lead gallery's thumbnail
   * selector — omitted (or with fewer than one entry) and the lead media
   * is just `cover`, exactly as before. `cover` itself is always shown
   * first, so it isn't repeated here. `caption` labels which screen is
   * showing (overlaid on the media itself, not a figcaption below it —
   * this is identifying a frame in a set, not describing a standalone
   * image the way `Figure`'s own caption does). A `kind: "video"` entry
   * skips `alt`: it has no static description, just the caption. */
  gallery?: WorkGalleryItem[];
  /** One external place to see or read more — the live product, a press
   * article, anything off-site. `label` says what it is in this project's
   * own words ("Visit site", "Read the feature", ...) rather than assuming
   * every project links to a live product. Omitted for projects with
   * nothing to point to yet — never a guessed URL or invented coverage. */
  reference?: { label: string; href: string };
  /** Who worked on it, beyond Justin — an org (e.g. "Fencing Federation of
   * Puerto Rico") or a named person, only once confirmed. Omitted entirely
   * until then: brief section 10 bars inventing facts, which includes
   * crediting a collaborator we haven't actually confirmed. Justin himself
   * is added automatically (see WorkPage), not duplicated here. */
  team?: WorkTeamMember[];
};

export type WorkEntry = {
  frontmatter: WorkFrontmatter;
  content: string;
};

export function getWorkSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getWorkEntry(slug: string): WorkEntry {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as WorkFrontmatter, content };
}

export function getAllWorkEntries(): readonly WorkEntry[] {
  return getWorkSlugs()
    .map((slug) => getWorkEntry(slug))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/** Keeps case studies continuous rather than ending as a dead end: wraps
 * from the last project (by frontmatter.order) back to the first. */
export function getNextWorkEntry(slug: string): WorkEntry {
  const entries = getAllWorkEntries();
  const index = entries.findIndex((entry) => entry.frontmatter.slug === slug);
  // Non-null: index is always found for a real slug, so the modulo index is
  // always in range of the (non-empty) entries array.
  return entries[(index + 1) % entries.length] as WorkEntry;
}

/** Brief section 6.3's "status (dot plus word)" treatment needs to know
 * which statuses count as "active" (accent dot) vs. wound-down (muted dot)
 * — shared by the home gallery and the project page's spec block so the
 * two can't drift apart on which statuses mean which.
 *
 * Denylist, not allowlist: active is the default, and only the actual
 * terminal states are called out. A project's status is free text (brief
 * section 9 lists "In testing, Live, Concluded, Completed" as examples, not
 * an enum), so matching only exact known-active strings silently breaks
 * the dot the moment a project uses different in-progress wording — which
 * is exactly what happened when JustIn's status became "Building and
 * testing" instead of "In testing". */
const terminalStatuses = ["Concluded", "Completed"];

export function isActiveStatus(status: string): boolean {
  return !terminalStatuses.includes(status);
}

/** The image a small thumbnail-sized spot (home index row, the "next
 * project" link) should show: `thumbnail` when a project has one — cropped
 * tight to its subject for small sizes, see `WorkFrontmatter.thumbnail` —
 * falling back to `cover`. Centralized so the two call sites can't drift
 * out of sync on this fallback the way the "next project" link once did. */
export function getIndexImage(
  frontmatter: WorkFrontmatter,
): { src: string; alt: string; background?: string } | undefined {
  const image = frontmatter.thumbnail ?? frontmatter.cover;
  if (!image) return undefined;
  return {
    src: image.src,
    alt: image.alt,
    ...(frontmatter.thumbnail?.background
      ? { background: frontmatter.thumbnail.background }
      : {}),
  };
}
