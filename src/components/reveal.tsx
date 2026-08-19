import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Fades a section in with a slight upward rise the first time it scrolls into
 * view. Fires once, near-instantly for whatever is already on screen at load
 * (the hero), so it doubles as a quiet page-load fade without extra code.
 *
 * No reduced-motion branching needed here: the global override in index.css
 * already collapses every transition-duration to ~0 for that preference, so
 * this becomes an instant, non-animated appearance automatically.
 *
 * Always a <section> — every current caller is a top-level page section, so
 * this stays a plain component rather than a polymorphic `as` prop.
 */
export default function Reveal({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
      {...props}
    />
  );
}
