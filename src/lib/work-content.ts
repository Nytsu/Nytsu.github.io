import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/work");

/** Brief section 9's content model. `cover` is optional: some projects don't
 * have a real photo yet, and Figure renders a clean placeholder rather than
 * a fabricated image when it's missing. */
export type WorkMilestone = {
  date: string; // "YYYY-MM"
  label: string;
  future?: boolean;
};

export type WorkFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  scope: string;
  status: string;
  builtWith: string;
  year: string;
  order: number;
  cover?: { src: string; alt: string };
  milestones?: WorkMilestone[];
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
