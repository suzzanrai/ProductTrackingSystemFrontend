import { Check, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ROLES, type RoleId } from "../model/roles";

interface RolePreviewCardProps {
  roleId: RoleId;
}

export function RolePreviewCard({ roleId }: RolePreviewCardProps) {
  const { t } = useTranslation();
  const role = ROLES.find((item) => item.id === roleId);

  if (!role) {
    return null;
  }

  const Icon = role.icon;

  return (
    <div
      aria-live="polite"
      className="flex w-full flex-col gap-3 rounded-card border-2 border-primary bg-background p-4 md:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-control border bg-surface text-primary">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-heading font-semibold text-text">
              {t(`roleSelect.roles.${role.id.toLowerCase()}.title`)}
            </h2>
          </div>
        </div>
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-4" aria-hidden="true" />
        </span>
      </div>

      <p className="text-small leading-relaxed text-text-muted">
        {t(`roleSelect.roles.${role.id.toLowerCase()}.description`)}
      </p>

      <p className="flex items-center gap-1.5 border-t pt-3 text-small text-text-muted">
        <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {t("roleSelect.ledgerNote")}
      </p>
    </div>
  );
}
