import { contact } from "../content";
import Reveal from "./reveal";

/**
 * Email, links, résumé. No form — a form is a thing to maintain and a place for
 * spam to land, and it asks the visitor to trust an endpoint they cannot see.
 *
 * The address is assembled at runtime from two halves so it never appears as a
 * complete string in the served HTML. This stops naive scrapers, not determined
 * ones; it costs nothing and the mailto still works normally.
 *
 * `label` defaults to the homepage's numbered slot. The JustIn page reuses
 * this component as an unnumbered footer, so it overrides the label rather
 * than colliding with that page's own 01–08 sequence (04 is already Hardware
 * there).
 */
export default function Contact({
  label = "04 / Contact",
}: {
  label?: string;
}) {
  const address = `${contact.email.user}@${contact.email.domain}`;

  return (
    <Reveal id="contact" className="scroll-mt-24 border-rule border-t pt-8">
      <p className="section-label mb-6">{label}</p>

      <p className="mb-8 max-w-[27.5rem] text-body text-copy">
        {contact.intro}
      </p>

      <ul className="flex flex-col gap-3">
        <li>
          <a
            href={`mailto:${address}`}
            className="text-nav text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
          >
            {address}
          </a>
        </li>
        {contact.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-nav text-secondary underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
