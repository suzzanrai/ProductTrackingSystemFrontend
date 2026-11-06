import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Clock3, type LucideIcon } from "lucide-react";
import {
  type DashboardPath,
  type DashboardNavigationItem,
  type DashboardModuleRoute,
} from "@widgets/dashboard-layout";

export interface DashboardOverviewConfig {
  homeTo: DashboardPath;
  moduleRoute: DashboardModuleRoute;
  roleKey: string;
  roleNameKey: string;
  roleDescriptionKey: string;
  roleIcon: LucideIcon;
  modules: readonly Omit<DashboardNavigationItem, "label" | "route">[];
}

interface DashboardOverviewProps {
  config: DashboardOverviewConfig;
}

export function DashboardOverview({ config }: DashboardOverviewProps) {
  const { t } = useTranslation();
  const RoleIcon = config.roleIcon;
  const roleLabel = t(config.roleNameKey);
  const roleDescription = t(config.roleDescriptionKey);
  const navigation = config.modules.map((module) => ({
    ...module,
    label: t(`dashboard.moduleNames.${config.roleKey}.${module.id}`),
    route: config.moduleRoute,
  }));

  return (
      <div className="space-y-7">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-small font-medium text-primary">
              {t("dashboard.welcome")}
            </p>
            <h1 className="text-title font-semibold tracking-tight text-text md:text-[32px]">
              {t("dashboard.overview")}
            </h1>
            <p className="max-w-2xl text-small leading-relaxed text-text-muted">
              {roleDescription}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-light bg-primary-light px-3 py-1.5 text-small font-semibold text-primary">
            <RoleIcon size={16} aria-hidden="true" />
            {roleLabel}
          </span>
        </section>

        <section className="overflow-hidden rounded-card border bg-surface">
          <div className="flex items-start gap-4 border-b px-5 py-5 md:px-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-primary-light text-primary">
              <BadgeCheck size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-heading font-semibold">
                {t("dashboard.workspaceReady")}
              </h2>
              <p className="mt-1 max-w-3xl text-small leading-relaxed text-text-muted">
                {t("dashboard.workspaceDescription", { role: roleLabel })}
              </p>
            </div>
          </div>
          <div className="grid gap-3 bg-background/70 p-4 sm:grid-cols-2 lg:grid-cols-3 md:p-5">
            {navigation.map(({ id, icon: Icon, label, route }) => (
              <Link
                to={route}
                params={{ module: id }}
                key={id}
                className="flex min-h-28 items-start gap-3 rounded-card border bg-surface p-4 hover:border-primary"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-control border bg-surface text-primary">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-small font-semibold">{label}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-text-muted">
                    {t("dashboard.moduleDescription")}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-text-muted"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-card border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="flex items-start gap-3">
            <Clock3
              className="mt-0.5 size-5 shrink-0 text-text-muted"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-small font-semibold">
                {t("dashboard.activityTitle")}
              </h2>
              <p className="mt-1 text-small text-text-muted">
                {t("dashboard.activityEmpty")}
              </p>
            </div>
          </div>
          <span className="w-fit rounded-full border bg-background px-3 py-1 text-[11px] font-medium text-text-muted">
            {t("dashboard.comingSoon")}
          </span>
        </section>
      </div>
  );
}
