import type { InputHTMLAttributes } from "react";

interface DashboardFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function DashboardField({
  label,
  className = "",
  required = true,
  ...props
}: DashboardFieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-text-muted">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        className={`h-control w-full rounded-control border border-border bg-surface px-4 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
        required={required}
        {...props}
      />
    </label>
  );
}
