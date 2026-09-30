"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/container";
import { Mark } from "@/components/mark";

/** Four items max (brief section 5). "Work" points at home: the project index is
 * the home page's centerpiece (brief section 5), not a separate route — only
 * individual case studies get their own URL, under /work/[slug]. */
const links = [
  { key: "work", href: "/" },
  { key: "about", href: "/about" },
  { key: "cv", href: "/cv" },
  { key: "contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/work/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  pathname,
  onNavigate = () => {},
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className: string;
}) {
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("primary")} className={className}>
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className="inline-flex items-center gap-2 py-2 text-nav text-ink"
          >
            {active && (
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
            )}
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line print:hidden">
      <Container className="flex h-18 items-center justify-between">
        <Link href="/" aria-label={t("home")}>
          <Mark size="sm" />
        </Link>

        <NavLinks
          pathname={pathname}
          className="hidden items-center gap-6 sm:flex"
        />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-line text-ink sm:hidden"
              aria-label={t("openMenu")}
            >
              <MenuIcon />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 sm:hidden" />
            <Dialog.Content
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg p-6 sm:hidden"
              aria-describedby={undefined}
            >
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  <Mark size="sm" />
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-line text-ink"
                    aria-label={t("closeMenu")}
                  >
                    <CloseIcon />
                  </button>
                </Dialog.Close>
              </div>

              <NavLinks
                pathname={pathname}
                onNavigate={() => setOpen(false)}
                className="mt-8 flex flex-col gap-1"
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 6h14M3 10h14M3 14h14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
