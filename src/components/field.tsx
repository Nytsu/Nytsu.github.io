import type { ComponentPropsWithoutRef } from "react";

type SharedProps = {
  id: string;
  label: string;
  help: string;
  error?: boolean;
};

type InputFieldProps = SharedProps & {
  multiline?: false;
} & Omit<ComponentPropsWithoutRef<"input">, "id">;

type TextareaFieldProps = SharedProps & {
  multiline: true;
} & Omit<ComponentPropsWithoutRef<"textarea">, "id">;

/** Brief §6.9: visible labels, help text, and error text that says how to
 * fix it — never color alone. The error state here is a heavier border
 * (2px) plus the help text itself changing to say what's wrong, not a red
 * outline: the token system has no error-red, on purpose. */
export function Field({
  id,
  label,
  help,
  error = false,
  multiline = false,
  className = "",
  ...props
}: InputFieldProps | TextareaFieldProps) {
  const helpId = `${id}-help`;
  const fieldClass = `min-h-11 rounded-control border bg-bg px-3 py-2.5 text-body text-ink ${
    error ? "border-2 border-ink" : "border-muted"
  } ${className}`;

  return (
    <div className="mb-5 grid max-w-[380px] gap-1.5">
      <label htmlFor={id} className="text-nav font-semibold text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          aria-describedby={helpId}
          aria-invalid={error}
          className={`${fieldClass} min-h-24 resize-y`}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input
          id={id}
          aria-describedby={helpId}
          aria-invalid={error}
          className={fieldClass}
          {...(props as ComponentPropsWithoutRef<"input">)}
        />
      )}
      <span
        id={helpId}
        className={`text-small ${error ? "text-ink" : "text-muted"}`}
      >
        {help}
      </span>
    </div>
  );
}
