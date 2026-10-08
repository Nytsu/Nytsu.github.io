"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Drop-in Link that also scrolls to top on navigation, via onNavigate.
 * Its own file because Server Components can't pass a function directly
 * into a Client Component prop. */
export function ScrollTopLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} onNavigate={() => window.scrollTo(0, 0)} />;
}
