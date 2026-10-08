import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Static export for GitHub Pages: no Node server available at hosting time,
// so `next/image`'s optimization API (which needs a server) is turned off.
// Source images should be pre-sized and served as modern formats already.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Dev-only: lets another device on the LAN (e.g. a large external display)
  // load the dev server by IP. Without this, Next.js blocks cross-origin
  // requests to /_next/* assets, so the page renders but no client JS (e.g.
  // ScrollReadingProgress) ever runs — looks like a broken feature, isn't one.
  allowedDevOrigins: ["192.168.1.31"],
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
