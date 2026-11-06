import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const RoleIcon = config.roleIcon;
  const navigation = config.modules.map((module) => ({
    ...module,
    label: t(`dashboard.moduleNames.${config.roleKey}.${module.id}`),
    route: config.moduleRoute,
  }));
  const activeModule = navigation.find((item) =>
    pathname.endsWith(`/${item.id}`),
  );
  const pageTitle = activeModule?.label ?? t("dashboard.dashboard");
  const profileRef = useRef<HTMLDivElement>(null);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [desktopNavigation, setDesktopNavigation] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigationHidden = !desktopNavigation && !mobileNavigationOpen;
  const profileName = user.displayName || user.email || t("dashboard.signedIn");
  const profileInitials = profileName
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

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

  useEffect(() => {
    if (!profileMenuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !profileRef.current?.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileMenuOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [profileMenuOpen]);

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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-200 lg:translate-x-0 ${
          mobileNavigationOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Link
            to={config.homeTo}
            className="flex min-w-0 items-center gap-3"
            onClick={closeMobileNavigation}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm ring-2 ring-primary-light">
              <BadgeCheck size={21} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[15px] font-bold leading-tight tracking-tight">
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
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            {t("dashboard.core")}
          </p>
          <Link
            to={config.homeTo}
            activeOptions={{ exact: true }}
            onClick={closeMobileNavigation}
            className="flex min-h-9 items-center gap-2.5 rounded-lg border-l-2 border-primary bg-primary-light px-3 text-xs font-semibold text-primary"
          >
            <LayoutDashboard size={17} aria-hidden="true" />
            {t("dashboard.dashboard")}
          </Link>

          <p className="mb-2 mt-6 px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
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
                    className:
                      "border-l-2 border-primary bg-primary-light font-semibold text-primary",
                  }}
                  onClick={closeMobileNavigation}
                  className="flex min-h-9 w-full items-center gap-2.5 rounded-lg border-l-2 border-transparent px-3 text-left text-xs font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
                >
                  <Icon size={17} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-background p-2">
            <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white ring-1 ring-border">
              {profileInitials || <RoleIcon size={15} aria-hidden="true" />}
              <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-white bg-success" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="block truncate text-[12px] font-bold leading-tight">
                  {profileName}
                </span>
                <span className="shrink-0 rounded bg-success-bg px-1 py-0.5 text-[8px] font-bold uppercase tracking-tight text-success-text">
                  {t(config.roleNameKey)}
                </span>
              </span>
              <span className="block truncate text-[10px] leading-tight text-text-muted">
                {user.email || t("dashboard.signedIn")}
              </span>
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              aria-label={t("common.signOut")}
              title={t("common.signOut")}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-danger-bg hover:text-danger"
            >
              <LogOut size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
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
            <div className="hidden min-w-0 items-center gap-2 text-xs sm:flex">
              <span className="truncate text-text-muted">
                {t("dashboard.registryPlatform")}
              </span>
              <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
              <span className="truncate font-semibold text-text">{pageTitle}</span>
            </div>
            <label className="relative ml-0 md:ml-2">
              <Search
                size={16}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label={t("dashboard.searchPlaceholder")}
                placeholder={t("dashboard.searchPlaceholder")}
                className="h-8 w-40 rounded-lg border border-border bg-background pl-8 pr-3 text-[11px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-52 md:w-72"
              />
            </label>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            <LanguageToggle />
            <span className="mx-0.5 hidden h-4 w-px bg-border sm:block" />
            <button
              type="button"
              aria-label={t("dashboard.help")}
              title={t("dashboard.help")}
              className="flex size-9 items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-border hover:bg-background hover:text-text"
            >
              <CircleHelp size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={t("dashboard.notifications")}
              title={t("dashboard.notifications")}
              className="relative flex size-9 items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-border hover:bg-background hover:text-text"
            >
              <Bell size={17} aria-hidden="true" />
              <span className="absolute right-2 top-2 size-2 rounded-full border border-white bg-danger" />
            </button>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                aria-label={t("dashboard.profileMenu")}
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                onClick={() => setProfileMenuOpen((open) => !open)}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-transparent px-1.5 transition-colors hover:border-border hover:bg-background"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {profileInitials || <RoleIcon size={14} aria-hidden="true" />}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-text-muted transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-surface py-1.5 shadow-floating"
                >
                  <div className="border-b border-border bg-background/70 px-4 py-3">
                    <p className="truncate text-xs font-bold text-text">
                      {profileName}
                    </p>
                    <p className="truncate text-[11px] text-text-muted">
                      {user.email}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase text-success-text">
                      {t(config.roleNameKey)}
                    </p>
                  </div>
                  {showPreviewRoleSelector && (
                    <label className="block px-4 py-2 text-xs text-text-muted">
                      {t("dashboard.previewRole")}
                      <select
                        value={config.roleKey}
                        onChange={(event) =>
                          onPreviewRoleChange(event.target.value)
                        }
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs text-text"
                      >
                        {previewDashboards.map((dashboard) => (
                          <option
                            key={dashboard.roleKey}
                            value={dashboard.roleKey}
                          >
                            {t(dashboard.roleNameKey)}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => void signOut()}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-xs font-medium text-danger transition-colors hover:bg-danger-bg"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    {t("common.signOut")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-4 md:p-6 lg:p-8">
          {children}
        </main>

        <footer className="mt-auto flex min-h-12 shrink-0 flex-col items-center justify-between gap-2 border-t border-border bg-surface px-4 py-3 text-[10px] text-text-muted sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text">
              {t("dashboard.footerCopyright")}
            </span>
            <span aria-hidden="true">•</span>
            <span>{t("dashboard.footerRegistry")}</span>
          </div>
          <nav
            aria-label={t("dashboard.footerNavigation")}
            className="flex items-center gap-4"
          >
            <span>
              {t("dashboard.footerPrivacy")}
            </span>
            <span>
              {t("dashboard.footerSecurity")}
            </span>
            <span>
              {t("dashboard.footerSupport")}
            </span>
          </nav>
        </footer>
      </div>
    </div>
  );
}
