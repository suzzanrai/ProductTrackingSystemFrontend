import type { HTMLAttributes } from "react";

type DashboardCardProps = HTMLAttributes<HTMLElement>;

export function DashboardCard({ className = "", ...props }: DashboardCardProps) {
  return (
    <section
      className={`rounded-card border border-border bg-surface ${className}`}
      {...props}
    />
  );
}
