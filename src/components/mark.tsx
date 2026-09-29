/** The personal mark (brief §6.1, option A: wordmark). A signature, not a
 * brand system — the name in the heading font with the accent dot tucked in
 * like a period. Non-breaking spaces keep "De La Cruz" from wrapping. */
export function Mark({ size = "base" }: { size?: "base" | "sm" }) {
  return (
    <span className={`wordmark ${size === "sm" ? "wordmark-sm" : ""}`}>
      Justin J De{" "}La{" "}Cruz
      <span className="wordmark-dot" aria-hidden="true" />
    </span>
  );
}
