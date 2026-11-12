import { useId } from "react";

const BASE =
  "w-full px-4 py-3 border rounded-lg outline-none transition placeholder:text-gray-400";

const TONE = {
  normal: "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
  error: "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100",
};

export default function Field({
  label,
  error,
  hint,
  type = "text",
  as: Tag = "input",
  rows = 3,
  className = "",
  ...props
}) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <Tag
        id={id}
        {...(Tag === "input" ? { type } : { rows })}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${BASE} ${error ? TONE.error : TONE.normal} ${
          Tag === "textarea" ? "resize-none" : ""
        } ${className}`}
        {...props}
      />

      {error ? (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
