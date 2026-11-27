import type { ButtonHTMLAttributes } from "react";

type DashboardButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "danger"
  | "ghost";

interface DashboardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DashboardButtonVariant;
}

const variants: Record<DashboardButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "border border-primary text-primary hover:bg-primary-light",
  neutral: "border border-border text-text hover:bg-background",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "text-text-muted hover:bg-background hover:text-text",
};

export function DashboardButton({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: DashboardButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-control items-center justify-center gap-2 rounded-control px-4 text-small font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
