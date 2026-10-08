"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronIcon } from "@/components/chevron-icon";

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

/** Brief section 4 explicitly names an "image lightbox dialog" as one of the
 * few places Radix belongs (a real keyboard-trap/focus/ESC problem, not
 * just a styled widget). Tap or click the image to see it full-size, with a
 * plain opacity fade in and out (the `animate-dialog-in`/`-out` tokens in
 * globals.css) — brief section 7 allows exactly this, ~180ms opacity
 * changes, nothing more. Keyed to Radix's own `data-state` rather than
 * React state so both directions animate: Radix keeps a closing Dialog
 * mounted until a CSS animation on `[data-state="closed"]` finishes. */
export function ImageLightbox({
  src,
  alt,
  openLabel,
  closeLabel,
  children,
  width = 1600,
  height = 900,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  caption,
  imageClassName,
}: {
  src: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
  /** The real source dimensions, used as next/image's aspect-ratio hint so
   * the reserved space matches the image before it loads — wrong for
   * anything that isn't close to 16:9 (a portrait phone screenshot,
   * say), where the default would reserve landscape space and then jump
   * to the real size once loaded. */
  width?: number;
  height?: number;
  /** Optional prev/next, for a caller that's itself a multi-item gallery
   * (PhoneGallery) — lets the viewer cycle through items without closing
   * the dialog. `src`/`alt` just update in place: Radix's own open state is
   * uncontrolled here and doesn't care that the content underneath it
   * changed. Omitted entirely for a single-image caller (Figure), which
   * renders no arrows. */
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  /** Visible label for which item is showing — `alt` alone is screen-reader
   * only (`Dialog.Title`), so a sighted viewer cycling through a multi-item
   * gallery has nothing telling them where they are otherwise. */
  caption?: string;
  /** Extra classes for the full-size image — e.g. matching PhoneGallery's
   * `rounded-[28px]` silhouette, since the source screenshot itself has
   * square corners that would otherwise look inconsistent zoomed in. */
  imageClassName?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={openLabel}
          className="block w-full cursor-zoom-in text-left"
        >
          {children}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/80 data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-6 data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`h-auto max-h-[85vh] w-auto max-w-full object-contain ${imageClassName ?? ""}`}
          />
          {caption && (
            <span className="-translate-x-1/2 fixed bottom-6 left-1/2 rounded-control border border-line bg-bg px-3 py-1.5 text-small text-ink">
              {caption}
            </span>
          )}
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label={closeLabel}
              className="fixed top-4 right-4 flex h-11 w-11 items-center justify-center rounded-control border border-line bg-bg text-ink"
            >
              <CloseIcon />
            </button>
          </Dialog.Close>
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label={prevLabel}
              className="-translate-y-1/2 fixed top-1/2 left-4 flex h-11 w-11 items-center justify-center rounded-control border border-line bg-bg text-ink"
            >
              <ChevronIcon direction="left" />
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label={nextLabel}
              className="-translate-y-1/2 fixed top-1/2 right-4 flex h-11 w-11 items-center justify-center rounded-control border border-line bg-bg text-ink"
            >
              <ChevronIcon direction="right" />
            </button>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
