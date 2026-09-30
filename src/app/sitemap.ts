import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getWorkSlugs } from "@/lib/work-content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/cv", "/contact"];
  const workPaths = getWorkSlugs().map((slug) => `/work/${slug}`);

  return [...staticPaths, ...workPaths].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
