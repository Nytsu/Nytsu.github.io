/** Parses a "YYYY-MM" frontmatter date (brief section 9's milestone format)
 * into a Date at the first of that month. */
export function parseYearMonth(value: string): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1);
}
