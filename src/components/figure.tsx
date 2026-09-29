import Image from "next/image";

/** Brief §6.5: hairline border, square corners by default, caption in small
 * muted text that says plainly what the image shows. `ratio` is a real CSS
 * aspect-ratio value (e.g. "16/9", "4/3", "3/4") — set via inline style
 * rather than an arbitrary Tailwind class, since Tailwind can't generate a
 * utility for a value it only sees at runtime. `alt` is required, not
 * optional: brief §8 requires meaningful alt text on every image. */
export function Figure({
  src,
  alt,
  caption,
  ratio = "4/3",
  sizes = "(min-width: 1120px) 1120px, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-img border border-line bg-subtle"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-small text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
