import Contact from "./components/contact";
import Currently from "./components/currently";
import Experience from "./components/experience";
import Grain from "./components/grain";
import Hero from "./components/hero";
import Nav from "./components/nav";
import Work from "./components/work";

export default function App() {
  return (
    <>
      <Grain />

      {/* First tab stop. Off-screen until focused, then it lands in the
          top-left as a real, readable control. See `skip-link` in index.css. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main
        id="main"
        className="mx-auto flex max-w-column flex-col gap-16 px-6 pb-24 sm:gap-20 sm:px-12 sm:pb-32"
      >
        <Hero />
        <Work />
        <Experience />
        <Currently />
        <Contact />
      </main>
    </>
  );
}
