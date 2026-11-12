import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm",
  secondary: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "text-gray-600 hover:bg-gray-100",
};

export default function Button({
  children,
  loading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
