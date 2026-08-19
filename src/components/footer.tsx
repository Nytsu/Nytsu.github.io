import { hero } from "../content";

/**
 * One quiet line, not a legal block. Not wrapped in Reveal: it's page chrome
 * like Nav, not content worth animating in.
 */
export default function Footer() {
  return (
    <footer className="mx-auto max-w-column border-rule border-t px-6 pt-8 pb-10 sm:px-12">
      <p className="font-mono text-label text-secondary">
        © {new Date().getFullYear()} {hero.name}
      </p>
    </footer>
  );
}
