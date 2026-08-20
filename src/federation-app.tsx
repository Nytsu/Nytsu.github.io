import Figures from "./components/case-study/figures";
import ListSection from "./components/case-study/list-section";
import TextSection from "./components/case-study/text-section";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Grain from "./components/grain";
import Nav from "./components/nav";
import Reveal from "./components/reveal";
import {
  federationBuilt,
  federationConstraints,
  federationFigures,
  federationHero,
  federationNav,
  federationOutcome,
  federationOverview,
  federationProblem,
  federationRole,
  federationStack,
} from "./content";

/**
 * The Fencing Federation case study.
 *
 * Same page grammar as /justin/ so the two read as one site, but a different
 * emphasis: JustIn is a story about building a product from nothing, this is a
 * story about delivering into an organisation that already had constraints,
 * obligations, and a way of working.
 */
export default function FederationApp() {
  return (
    <>
      <Grain />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav items={federationNav} />

      <main
        id="main"
        className="mx-auto flex max-w-column flex-col gap-16 px-6 pb-24 sm:gap-20 sm:px-12 sm:pb-32"
      >
        <Reveal className="pt-[13vh]">
          <div className="mb-7 flex items-center gap-2.5">
            <span className="mark" aria-hidden="true" />
            <span className="section-label">{federationHero.eyebrow}</span>
          </div>

          <h1 className="mb-4 max-w-[29rem] text-name-sm font-medium text-ink sm:text-name">
            {federationHero.title}
          </h1>

          <p className="mb-8 max-w-[27.5rem] text-body text-copy">
            {federationHero.intro}
          </p>

          <p className="section-label">{federationHero.tags.join(" · ")}</p>
        </Reveal>

        <TextSection
          label={federationOverview.label}
          paragraphs={federationOverview.text}
        />
        <TextSection
          label={federationProblem.label}
          paragraphs={[federationProblem.text]}
        />
        <TextSection
          label={federationRole.label}
          paragraphs={[federationRole.text]}
        />
        <TextSection
          label={federationConstraints.label}
          paragraphs={[federationConstraints.text]}
        />
        <ListSection
          label={federationBuilt.label}
          items={federationBuilt.items}
        />
        <ListSection
          label={federationStack.label}
          items={federationStack.items}
        />
        <TextSection
          label={federationOutcome.label}
          paragraphs={[federationOutcome.text]}
        />
        <Figures
          label={federationFigures.label}
          intro={federationFigures.intro}
          figures={federationFigures.figures}
        />

        <Contact label="Contact" />
      </main>

      <Footer />
    </>
  );
}
