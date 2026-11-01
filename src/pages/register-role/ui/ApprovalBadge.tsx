import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@shared/lib";

interface ApprovalBadgeProps {
  className?: string;
}

export function ApprovalBadge({ className }: ApprovalBadgeProps) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-control border border-warning bg-warning-bg px-2 py-0.5 text-[12px] leading-none text-warning-text",
        className,
      )}
    >
      <Info className="size-3.5" aria-hidden="true" />
      {t("roleSelect.needsApproval")}
    </span>
  );
}
