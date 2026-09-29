import type { Metadata } from "next";
import { Geist, Zen_Kaku_Gothic_New } from "next/font/google";
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
  title: "Justin J De La Cruz — Portfolio (work in progress)",
  description:
    "Founder and engineer building hardware, firmware, and software end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${zenKakuGothicNew.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
