import type { Metadata, Viewport } from "next";
import { Geist, Zen_Kaku_Gothic_New } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ViewTransition } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Justin J De La Cruz",
    template: "%s — Justin J De La Cruz",
  },
  description:
    "Founder and engineer building hardware, firmware, and software end to end.",
};

/** Brief section 8: viewport-fit=cover, paired with safe-area-inset padding
 * on `html` in globals.css — cover alone would let content render under a
 * device notch/dynamic island without that padding to compensate. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${zenKakuGothicNew.variable}`}
      // The inline script below sets data-theme on this element before React
      // hydrates, so the attribute React sees on mount never matches what it
      // server-rendered (which never included it) — an expected mismatch
      // for this exact pattern, not a real one. suppressHydrationWarning
      // only silences warnings for this element's own attributes, not its
      // children, so it doesn't hide unrelated hydration bugs elsewhere.
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme from localStorage before first paint, so a saved
         * light/dark override doesn't flash the system-default theme first —
         * this is the only place a blocking inline script is justified here. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static string literal, no user input
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <Nav />
          <main id="main" className="flex-1">
            {/* Crossfades route changes via the browser's View Transitions
             * API instead of hard-cutting. Timing and the header exclusion
             * live in globals.css. Each internal <Link> scrolls to top via
             * its own onNavigate, fired before the transition snapshot —
             * without it, the crossfade blends mismatched scroll
             * positions. */}
            <ViewTransition>{children}</ViewTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
