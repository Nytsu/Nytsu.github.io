import { nav as defaultNav } from "../content";

type NavItem = { readonly label: string; readonly href: string };

/**
 * Pinned top-right, no background treatment. Quiet by design — small and
 * sans, so it should not compete with the name for the first look.
 *
 * `absolute`, not `fixed`, and this matters. The guidelines forbid any
 * background or blur behind the nav, so a fixed nav sits transparently on top
 * of whatever scrolls under it — at viewport widths around 800-1100px the links
 * land directly on the body copy and both become unreadable. Scrolling the nav
 * away is the only fix that does not add the background treatment the brand
 * rules out. The settled reference implementation (guidelines section 9) also
 * uses position: absolute, so this follows it rather than the prose in 8.
 *
 * `items` defaults to the homepage's anchor nav but is overridable — the
 * JustIn project page passes a single "← Home" link instead, since its
 * section anchors don't exist on the homepage.
 */
export default function Nav({
  items = defaultNav,
}: {
  items?: readonly NavItem[];
}) {
  return (
    <nav
      aria-label="Primary"
      className="absolute top-6 right-6 z-40 sm:top-10 sm:right-12"
    >
      <ul className="flex gap-5 sm:gap-7">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-nav text-secondary transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
