import { getTranslations } from "next-intl/server";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Field } from "@/components/field";
import { Figure } from "@/components/figure";
import { Note } from "@/components/note";
import { ProjectIndex } from "@/components/project-index";
import { ReadingProgress } from "@/components/reading-progress";
import { Tag } from "@/components/tag";
import { Timeline } from "@/components/timeline";
import { TimelineDivider } from "@/components/timeline-divider";

/**
 * Stage checkpoint only: a plain render of the tokens and core components,
 * so they can be judged in a browser before any real content exists.
 * Replaced by the real homepage in a later stage (brief section 13, stage 6).
 */
export default async function TokenShowcase() {
  const t = await getTranslations("timeline");

  return (
    <Container className="py-18">
      <p className="text-label text-muted">
        Stage 1–3 checkpoint — not the real homepage
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

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-head text-h2 font-semibold text-ink">
          Stage 3 — core components
        </h2>

        <h3 className="mt-8 component-title text-ink">Buttons</h3>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Contact me</Button>
          <Button variant="ghost">Download CV</Button>
          <Button disabled>Unavailable</Button>
        </div>

        <h3 className="mt-8 component-title text-ink">Tags</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag selected>Hardware</Tag>
          <Tag>Firmware</Tag>
          <Tag>Mobile</Tag>
          <Tag>Brand</Tag>
        </div>

        <h3 className="mt-8 component-title text-ink">Form fields</h3>
        <div className="mt-4">
          <Field
            id="demo-email"
            label="Your email"
            help="I reply within two days."
            type="email"
            placeholder="name@example.com"
          />
          <Field
            id="demo-message"
            label="Message"
            help="Write a message before sending."
            error
            multiline
          />
        </div>

        <h3 className="mt-8 component-title text-ink">Note</h3>
        <div className="mt-4">
          <Note title="Testing in progress">
            Second club test is planned. Some details on this page will change
            as I fix what the first one showed.
          </Note>
        </div>

        <h3 className="mt-8 component-title text-ink">Figure</h3>
        <div className="mt-4 max-w-md">
          <Figure
            src="/images/federation/dashboard.png"
            alt="An athlete dashboard showing federative membership and FIE licence status with expiry dates, club, weapon, category, and account type."
            caption="Athlete dashboard, Fencing Federation platform."
            ratio="1600/911"
          />
        </div>

        <h3 className="mt-8 component-title text-ink">Project index</h3>
        <div className="mt-4">
          <ProjectIndex
            labels={{
              project: "Project",
              role: "Role",
              builtWith: "Built with",
              status: "Status",
            }}
            items={[
              {
                slug: "justin",
                href: "#",
                name: "JustIn",
                role: "Founder, hardware, firmware, app",
                builtWith: "React Native, embedded, Bluetooth",
                status: { label: "In testing", active: true },
              },
              {
                slug: "federation",
                href: "#",
                name: "Fencing Federation of Puerto Rico site",
                role: "Designer, developer",
                builtWith: "WordPress, custom forms",
                status: { label: "Live", active: true },
                thumbnail: {
                  src: "/images/federation/dashboard.png",
                  alt: "Fencing Federation athlete dashboard",
                },
              },
              {
                slug: "zutto",
                href: "#",
                name: "Zutto",
                role: "Founder, designer, developer",
                builtWith: "Mobile app",
                status: { label: "Concluded", active: false },
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-head text-h2 font-semibold text-ink">
          Stage 4 — timeline motif
        </h2>

        <h3 className="mt-8 component-title text-ink">
          Timeline (JustIn's real milestones, brief section 9)
        </h3>
        <div className="mt-4">
          <Timeline
            replayLabel={t("replay")}
            milestones={[
              {
                date: new Date(2024, 3),
                label: "First components ordered",
              },
              {
                date: new Date(2025, 7),
                label: "Active development starts",
              },
              { date: new Date(2026, 6), label: "App complete" },
              {
                date: new Date(2026, 7),
                label: "First club test, all bouts ran",
              },
              {
                date: new Date(2027, 0),
                label: "Launch target",
                future: true,
              },
            ]}
          />
        </div>

        <h3 className="mt-8 component-title text-ink">
          Section divider variant
        </h3>
        <TimelineDivider />

        <h3 className="mt-8 component-title text-ink">
          Reading progress variant
        </h3>
        <div className="mt-4">
          <ReadingProgress progress={62} />
        </div>
      </div>
    </Container>
  );
}
