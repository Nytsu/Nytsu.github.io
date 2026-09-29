import { Container } from "@/components/container";

/**
 * Stage 1 checkpoint only: a plain render of the token file, so the tokens
 * can be judged in a browser before any real layout or components exist.
 * Replaced by the real homepage in a later stage (brief §13, stage 6).
 */
export default function TokenShowcase() {
  return (
    <Container className="py-18">
      <p className="text-label text-muted">
        Stage 1 — token check, not the real homepage
      </p>

      <h1 className="mt-4 font-head text-display font-semibold text-ink">
        Display, 34–52px
      </h1>

      <p className="mt-4 max-w-prose text-nav text-muted">
        Quiet, legible, structured. Body text at 17px with generous line height,
        headings in the display font, one accent color reserved for things you
        can interact with.
      </p>

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-head text-h2 font-semibold text-ink">
          Heading, 28px
        </h2>
        <h3 className="mt-4 font-head text-h3 font-semibold text-ink">
          Subheading, 20px
        </h3>
        <p className="mt-4 text-body text-ink">
          Body copy at 17px and 1.75 line height. JustIn is a wireless scoring
          system for fencing.{" "}
          <a href="https://justinfencing.com">A link uses the accent color</a>{" "}
          and underlines on hover.
        </p>
        <p className="mt-4 text-nav text-ink">
          Nav / row / control text, 15px.
        </p>
        <p className="mt-2 text-small text-muted">
          Small text, 14px — spec values, table cells, help text.
        </p>
        <p className="mt-2 text-label text-muted">
          Caption / meta, 13px — not mono, not uppercase.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-5">
        {(
          [
            ["bg", "bg-bg border border-line"],
            ["subtle", "bg-subtle border border-line"],
            ["ink", "bg-ink"],
            ["muted", "bg-muted"],
            ["accent", "bg-accent"],
          ] as const
        ).map(([name, cls]) => (
          <div key={name}>
            <div className={`h-16 rounded-control ${cls}`} />
            <p className="mt-2 text-label text-muted">{name}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-4 border-t border-line pt-8">
        <div className="h-24 w-24 rounded-img bg-subtle" />
        <p className="text-small text-muted">
          rounded-img (0px, square) vs. rounded-control (4px) on the swatches
          above.
        </p>
      </div>
    </Container>
  );
}
