import Contact from "./components/contact";
import Footer from "./components/footer";
import Grain from "./components/grain";
import Architecture from "./components/justin/architecture";
import FieldTest from "./components/justin/field-test";
import JustinHero from "./components/justin/justin-hero";
import ListSection from "./components/justin/list-section";
import TextSection from "./components/justin/text-section";
import Nav from "./components/nav";
import {
  justinHardware,
  justinNav,
  justinNext,
  justinOverview,
  justinProblem,
  justinSoftware,
} from "./content";

/**
 * The dedicated JustIn case study. This is where the technical depth that used
 * to live on the homepage now lives — Overview/Problem/System/Hardware/Software/
 * Field Test/Next. The homepage only introduces the project and links here.
 *
 * Contact stays at the bottom so a visitor who lands directly on this page
 * (rather than scrolling from the homepage) still has a path to email/résumé.
 */
export default function JustinApp() {
  return (
    <>
      <Grain />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav items={justinNav} />

      <main
        id="main"
        className="mx-auto flex max-w-column flex-col gap-16 px-6 pb-24 sm:gap-20 sm:px-12 sm:pb-32"
      >
        <JustinHero />
        <TextSection
          label={justinOverview.label}
          paragraphs={justinOverview.text}
        />
        <TextSection
          label={justinProblem.label}
          paragraphs={[justinProblem.text]}
        />
        <Architecture />
        <ListSection
          label={justinHardware.label}
          items={justinHardware.items}
        />
        <ListSection
          label={justinSoftware.label}
          items={justinSoftware.items}
        />
        <FieldTest />
        <ListSection label={justinNext.label} items={justinNext.items} />
        <Contact label="Contact" />
      </main>

      <Footer />
    </>
  );
}
