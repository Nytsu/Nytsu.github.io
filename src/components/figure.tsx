import Image from "next/image";

type BaseProps = {
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
};

type FigureProps =
  | ({ src: string; alt: string } & BaseProps)
  | ({ src?: undefined; alt?: undefined } & BaseProps);

/** Brief section 6.5: hairline border, square corners by default, caption in small
 * muted text that says plainly what the image shows. `ratio` is a real CSS
 * aspect-ratio value (e.g. "16/9", "4/3", "3/4") — set via inline style
 * rather than an arbitrary Tailwind class, since Tailwind can't generate a
 * utility for a value it only sees at runtime. `alt` is required whenever
 * `src` is given (brief section 8: meaningful alt text on every image);
 * omitting both renders an empty placeholder box for content that's known
 * to be missing a real photo, rather than inventing one. */
export function Figure({
  src,
  alt,
  caption,
  ratio = "4/3",
  sizes = "(min-width: 1120px) 1120px, 100vw",
  priority = false,
}: FigureProps) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-img border border-line bg-subtle"
        style={{ aspectRatio: ratio }}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-small text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
