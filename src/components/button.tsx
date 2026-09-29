import type { ButtonHTMLAttributes } from "react";

/** Brief §6.8: filled ink primary, outlined secondary, 44px minimum height,
 * 4px radius, hover to accent. Exported separately from `Button` so a link
 * that should look like a button (e.g. "Download CV") can use the same
 * classes on a Next `Link` instead of duplicating them. */
export function buttonClasses(variant: "primary" | "ghost" = "primary") {
  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-control border px-5 text-nav leading-none no-underline cursor-pointer disabled:cursor-not-allowed disabled:opacity-45";
  const variants = {
    primary:
      "border-ink bg-ink text-bg hover:border-accent hover:bg-accent hover:text-on-accent",
    ghost: "border-ink bg-transparent text-ink hover:bg-subtle",
  };
  return `${base} ${variants[variant]}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: {
  variant?: "primary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`${buttonClasses(variant)} ${className}`}
      {...props}
    />
  );
}
