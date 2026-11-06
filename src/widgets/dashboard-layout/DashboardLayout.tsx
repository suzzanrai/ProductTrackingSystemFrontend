import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { clearAuthSession } from "@shared/lib";
import { LanguageToggle } from "@shared/ui";
import type { AuthenticatedUser } from "@features/auth/model/authenticated-user";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export type DashboardPath =
  | "/farmer/dashboard"
  | "/collector/dashboard"
  | "/factory/dashboard"
  | "/wholesaler/dashboard"
  | "/retailer/dashboard"
  | "/consumer/dashboard"
  | "/super-admin/dashboard"
  | "/local-admin/dashboard";

export type DashboardModuleRoute =
  | "/farmer/$module"
  | "/collector/$module"
  | "/factory/$module"
  | "/wholesaler/$module"
  | "/retailer/$module"
  | "/consumer/$module"
  | "/super-admin/$module"
  | "/local-admin/$module";

export interface DashboardNavigationItem {
  id: string;
  icon: LucideIcon;
  label: string;
  route: DashboardModuleRoute;
}

interface DashboardLayoutProps {
  children: ReactNode;
  config: DashboardOverviewConfig;
  previewDashboards: readonly DashboardOverviewConfig[];
  user: AuthenticatedUser;
  showPreviewRoleSelector: boolean;
  onPreviewRoleChange: (roleKey: string) => void;
}

export function DashboardLayout({
  children,
  config,
  previewDashboards,
  user,
  showPreviewRoleSelector,
  onPreviewRoleChange,
}: DashboardLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const RoleIcon = config.roleIcon;
  const navigation = config.modules.map((module) => ({
    ...module,
    label: t(`dashboard.moduleNames.${config.roleKey}.${module.id}`),
    route: config.moduleRoute,
  }));
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [desktopNavigation, setDesktopNavigation] = useState(false);
  const navigationHidden = !desktopNavigation && !mobileNavigationOpen;

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const updateBreakpoint = () => setDesktopNavigation(breakpoint.matches);

    updateBreakpoint();
    breakpoint.addEventListener("change", updateBreakpoint);
    return () => breakpoint.removeEventListener("change", updateBreakpoint);
  }, []);

  useEffect(() => {
    if (!mobileNavigationOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavigationOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileNavigationOpen]);

  async function signOut() {
    clearAuthSession();
    await navigate({ to: "/login", replace: true });
  }

  function closeMobileNavigation() {
    setMobileNavigationOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {mobileNavigationOpen && (
        <button
          type="button"
          aria-label={t("dashboard.closeNavigation")}
          className="fixed inset-0 z-40 bg-text/40 lg:hidden"
          onClick={closeMobileNavigation}
        />
      )}

      <aside
        id="dashboard-navigation"
        aria-hidden={navigationHidden}
        inert={navigationHidden}
        className={`fixed inset-y-0 left-0 z-50 flex w-sidebar flex-col border-r bg-surface transition-transform duration-200 lg:translate-x-0 ${
          mobileNavigationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <Link
            to={config.homeTo}
            className="flex min-w-0 items-center gap-3"
            onClick={closeMobileNavigation}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-primary text-white ring-2 ring-primary-light">
              <BadgeCheck size={21} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[15px] font-bold tracking-tight">
                  TraceNepal
                </span>
                <span className="rounded bg-primary-light px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                  {t("dashboard.govBadge")}
                </span>
              </span>
              <span className="block text-[11px] leading-tight text-text-muted">
                {t("dashboard.registryPlatform")}
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label={t("dashboard.closeNavigation")}
            className="flex size-9 items-center justify-center rounded-control text-text-muted hover:bg-background lg:hidden"
            onClick={closeMobileNavigation}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label={t("dashboard.workspaceNavigation")}
          className="flex-1 overflow-y-auto px-3 py-5"
        >
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            {t("dashboard.workspace")}
          </p>
          <Link
            to={config.homeTo}
            activeOptions={{ exact: true }}
            onClick={closeMobileNavigation}
            className="flex min-h-11 items-center gap-3 rounded-control bg-primary-light px-3 text-small font-semibold text-primary"
          >
            <LayoutDashboard size={18} aria-hidden="true" />
            {t("dashboard.overview")}
            <ChevronRight className="ml-auto size-4" aria-hidden="true" />
          </Link>

          <p className="mb-2 mt-7 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            {t("dashboard.modules")}
          </p>
          <ul className="space-y-1">
            {navigation.map(({ id, icon: Icon, label, route }) => (
              <li key={id}>
                <Link
                  to={route}
                  params={{ module: id }}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className: "bg-primary-light font-semibold text-primary",
                  }}
                  onClick={closeMobileNavigation}
                  className="flex min-h-11 w-full items-center gap-3 rounded-control px-3 text-left text-small text-text-muted hover:bg-background hover:text-text"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-3">
          <div className="flex min-w-0 items-center gap-2.5 rounded-control border bg-background p-2">
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              <RoleIcon size={17} aria-hidden="true" />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-success" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-small font-semibold">
                {user.displayName || t("dashboard.signedIn")}
              </span>
              {user.email && (
                <span className="block truncate text-[11px] text-text-muted">
                  {user.email}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              aria-label={t("common.signOut")}
              title={t("common.signOut")}
              className="flex size-9 shrink-0 items-center justify-center rounded-control text-text-muted hover:bg-danger-bg hover:text-danger"
            >
              <LogOut size={17} aria-hidden="true" />
            </button>
          </div>
          {showPreviewRoleSelector && (
            <label className="mt-3 block text-[11px] font-medium text-text-muted">
              {t("dashboard.previewRole")}
              <select
                value={config.roleKey}
                onChange={(event) => onPreviewRoleChange(event.target.value)}
                className="mt-1 h-10 w-full rounded-control border bg-surface px-2 text-small text-text"
              >
                {previewDashboards.map((dashboard) => (
                  <option key={dashboard.roleKey} value={dashboard.roleKey}>
                    {t(dashboard.roleNameKey)}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </aside>

      <div className="min-h-screen lg:pl-sidebar">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-surface/95 px-4 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label={t("dashboard.openNavigation")}
              aria-controls="dashboard-navigation"
              aria-expanded={mobileNavigationOpen}
              className="flex size-10 shrink-0 items-center justify-center rounded-control border text-text-muted hover:bg-background lg:hidden"
              onClick={() => setMobileNavigationOpen(true)}
            >
              <Menu size={19} aria-hidden="true" />
            </button>
            <div className="hidden items-center gap-2 text-small text-text-muted sm:flex">
              <span>{t("dashboard.registryPlatform")}</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-semibold text-text">
                {t("dashboard.overview")}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <LanguageToggle />
            <span className="hidden h-6 w-px bg-border sm:block" />
            <button
              type="button"
              disabled
              aria-label={t("dashboard.help")}
              title={t("dashboard.help")}
              className="flex size-10 cursor-not-allowed items-center justify-center rounded-control text-text-muted opacity-70"
            >
              <CircleHelp size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-7rem)] w-full max-w-content px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>

        <footer className="flex min-h-14 flex-col justify-center gap-1 border-t bg-surface px-4 py-3 text-[11px] text-text-muted sm:flex-row sm:items-center sm:justify-between md:px-6">
          <span>
            <span className="font-semibold text-text">TraceNepal</span>
            <span className="px-2 text-border">•</span>
            {t("dashboard.footerTagline")}
          </span>
          <span>{t("dashboard.footerGateway")}</span>
        </footer>
      </div>
    </div>
  );
}
