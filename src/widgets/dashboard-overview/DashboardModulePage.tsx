import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DashboardOverviewConfig } from "./DashboardOverview";

interface DashboardModulePageProps {
  config: DashboardOverviewConfig;
  moduleId: string;
}

export function DashboardModulePage({
  config,
  moduleId,
}: DashboardModulePageProps) {
  const { t } = useTranslation();
  const roleLabel = t(config.roleNameKey);
  const module = config.modules.find((item) => item.id === moduleId);
  const ModuleIcon = module?.icon;
  const moduleLabel = module
    ? t(`dashboard.moduleNames.${config.roleKey}.${module.id}`)
    : t("dashboard.moduleNotFound");

  return (
      <div className="space-y-6">
        <Link
          to={config.homeTo}
          className="inline-flex min-h-10 items-center gap-2 rounded-control text-small font-medium text-text-muted hover:text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t("dashboard.overview")}
        </Link>

        <section className="rounded-card border bg-surface p-5 md:p-7">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-primary-light text-primary">
              {ModuleIcon ? (
                <ModuleIcon size={22} aria-hidden="true" />
              ) : (
                <BadgeCheck size={22} aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0">
              <p className="text-small font-medium text-primary">
                {roleLabel}
              </p>
              <h1 className="mt-1 text-title font-semibold tracking-tight">
                {moduleLabel}
              </h1>
              <p className="mt-2 max-w-2xl text-small leading-relaxed text-text-muted">
                {module
                  ? t("dashboard.moduleDescription")
                  : t("dashboard.moduleNotFoundDescription")}
              </p>
            </div>
          </div>
          {module && (
            <div className="mt-6 flex items-start gap-3 rounded-control border bg-background p-4">
              <BadgeCheck
                size={18}
                className="mt-0.5 shrink-0 text-text-muted"
                aria-hidden="true"
              />
              <p className="text-small text-text-muted">
                {t("dashboard.moduleComingSoon")}
              </p>
            </div>
          )}
        </section>
      </div>
  );
}
