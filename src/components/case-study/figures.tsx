import { useRef, useState } from "react";
import Reveal from "../reveal";

export type Figure = {
  /** Path under `public/images/…`. Omit while the screenshot doesn't exist yet. */
  readonly src?: string;
  /** Describes the content for screen readers. Never "screenshot of the site". */
  readonly alt: string;
  /** Shown under the image, mono. Says what the reader is looking at. */
  readonly caption: string;
  /** CSS aspect-ratio, e.g. "1600 / 910". Reserves the box so nothing reflows
   *  when the image decodes, and holds the placeholder's shape before then. */
  readonly ratio?: string;
};

/**
 * Screenshot / image section for a case study.
 *
 * Figures without a `src` are placeholders. They render as an empty framed box
 * **in dev only** — in a production build they are dropped entirely, so a
 * half-finished page can deploy without shipping "image pending" boxes to a
 * recruiter.
 *
 * The 1px rule around each image is load-bearing, not decoration: a screenshot
 * of a light UI sitting on the warm near-white page background has no edge of
 * its own and bleeds into it.
 *
 * object-contain, not object-cover: these are screenshots, and cover would
 * silently crop content off the edges whenever a figure's declared `ratio` is
 * even slightly off the image's real one. Contain letterboxes instead, which is
 * invisible at a near-match and never destroys information.
 *
 * Clicking a figure opens it full-size. Inline, a screenshot renders about
 * 664px wide inside the 760px column, which is too small to read UI text in —
 * so the detail the figures exist to show is only really available enlarged.
 * Built on <dialog> rather than a hand-rolled overlay: the browser gives us
 * Escape-to-close, focus trapping, inertness of the page behind, and focus
 * restored to the triggering button, none of which is worth reimplementing.
 */
export default function Figures({
  label,
  intro,
  figures,
}: {
  label: string;
  intro?: string;
  figures: readonly Figure[];
}) {
  const ready = figures.filter((figure) => figure.src);
  const pending = figures.filter((figure) => !figure.src);
  const shown = import.meta.env.DEV ? figures : ready;

  const [enlarged, setEnlarged] = useState<Figure | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Driven imperatively rather than from an effect keyed on `enlarged`.
  // With an effect, reopening the *same* figure was a no-op: setEnlarged gets
  // the identical object reference, React bails out of the re-render, the
  // effect never re-runs, and showModal() is never called — so the second
  // click on a figure you had already viewed did nothing. Calling the dialog
  // API at the point of the interaction has no such identity dependency.
  function openFigure(figure: Figure) {
    setEnlarged(figure);
    const dialog = dialogRef.current;
    // showModal() throws if the dialog is already open, which happens when
    // switching straight from one figure to another.
    if (dialog && !dialog.open) dialog.showModal();
  }

  function closeFigure() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setEnlarged(null);
  }

  // Nothing real to show and not in dev: omit the section rather than render an
  // empty labelled heading.
  if (shown.length === 0) return null;

  return (
    <Reveal className="border-rule border-t pt-8">
      <p className="section-label mb-6">{label}</p>

      {intro && (
        <p className="mb-8 max-w-[29rem] text-desc text-copy">{intro}</p>
      )}

      <div className="flex flex-col gap-10">
        {shown.map((figure) => (
          <figure key={figure.caption}>
            {figure.src ? (
              <button
                type="button"
                onClick={() => openFigure(figure)}
                // The caption alone is not enough of a label: a screen reader
                // user needs to know this is a control and what it will do.
                aria-label={`View larger: ${figure.caption}`}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src={figure.src}
                  alt={figure.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: figure.ratio ?? "16 / 10" }}
                  className="w-full border border-rule object-contain transition-colors hover:border-accent"
                />
              </button>
            ) : import.meta.env.DEV ? (
              // Explicitly DEV-gated rather than relying on `shown` filtering
              // src-less figures out in production. Both would behave the same,
              // but this way the branch is statically false in a prod build and
              // the minifier drops it instead of shipping unreachable markup.
              <div
                style={{ aspectRatio: figure.ratio ?? "16 / 10" }}
                className="flex w-full items-center justify-center border border-rule"
              >
                <span className="section-label">Dev placeholder</span>
              </div>
            ) : null}
            <figcaption className="mt-3 font-mono text-label text-secondary">
              {figure.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {import.meta.env.DEV && pending.length > 0 && (
        <p className="mt-8 font-mono text-label text-secondary">
          {pending.length} figure{pending.length === 1 ? "" : "s"} awaiting an
          image. Placeholders are dev-only and will not appear in the built
          site.
        </p>
      )}

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the onClick here only
          implements click-on-backdrop-to-close. The keyboard equivalent is
          Escape, which showModal() provides natively, and there is a focusable
          Close button as well — a keyboard handler on the dialog would be
          redundant, not an accessibility improvement. */}
      <dialog
        ref={dialogRef}
        // Fires on Escape as well as dialog.close(), so state stays in sync
        // with the element however it was dismissed.
        onClose={closeFigure}
        // Clicks on ::backdrop are dispatched to the dialog itself, so this
        // gives click-outside-to-close without an extra overlay element.
        onClick={(event) => {
          if (event.target === dialogRef.current) closeFigure();
        }}
        aria-label={enlarged ? `${enlarged.caption}, enlarged` : undefined}
        className="lightbox"
      >
        {enlarged?.src && (
          <div className="flex flex-col">
            <img
              src={enlarged.src}
              alt={enlarged.alt}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <div className="flex items-center justify-between gap-4 border-rule border-t px-4 py-3">
              <span className="font-mono text-label text-secondary">
                {enlarged.caption}
              </span>
              <button
                type="button"
                onClick={closeFigure}
                className="font-mono text-nav text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </Reveal>
  );
}
