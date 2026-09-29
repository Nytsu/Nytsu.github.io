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
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
