const TONES = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
  info: "bg-indigo-50 border-indigo-200 text-indigo-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
};

export default function Alert({ tone = "info", children, className = "" }) {
  if (!children) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`px-4 py-3 rounded-lg border text-sm ${TONES[tone] ?? TONES.info} ${className}`}
    >
      {children}
    </div>
  );
}
