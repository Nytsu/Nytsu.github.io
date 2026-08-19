/**
 * Full-page noise overlay. Stops the flat warm white from reading as sterile.
 * Deliberately below the threshold of conscious notice — if you can see it,
 * it is too strong (brand-guidelines.md section 6).
 */
export default function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
