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
import { useUiStore } from "@shared/store";
import { DashboardButton, LanguageToggle } from "@shared/ui";
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
  const language = useUiStore((state) => state.language);
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
  const isSuperAdmin = config.roleKey === "superAdmin";
  const activeModule = navigation.find((item) =>
    pathname.endsWith(`/${item.id}`),
  );
  const pageTitle = activeModule?.label ?? t("dashboard.dashboard");
  const profileRef = useRef<HTMLDivElement>(null);
  const signOutDialogRef = useRef<HTMLDivElement>(null);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [desktopNavigation, setDesktopNavigation] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [signOutConfirmationOpen, setSignOutConfirmationOpen] = useState(false);
  const navigationHidden = !desktopNavigation && !mobileNavigationOpen;
  const localizedName = language === "ne" ? user.nameNe : user.nameEn;
  const profileName =
    localizedName || user.displayName || user.email || t("dashboard.signedIn");
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

  useEffect(() => {
    if (!signOutConfirmationOpen) return;

    signOutDialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSignOutConfirmationOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [signOutConfirmationOpen]);

  async function signOut() {
    clearAuthSession();
    await navigate({ to: "/login", replace: true });
  }

  function requestSignOut() {
    setProfileMenuOpen(false);
    setSignOutConfirmationOpen(true);
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
            <span className="flex size-9 shrink-0 items-center justify-center rounded-card bg-primary text-white shadow-sm ring-2 ring-primary-light">
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
          <DashboardButton
            variant="ghost"
            type="button"
            aria-label={t("dashboard.closeNavigation")}
            className="size-9 min-h-0 px-0 lg:hidden"
            onClick={closeMobileNavigation}
          >
            <X size={18} aria-hidden="true" />
          </DashboardButton>
        </div>

        <nav
          aria-label={t("dashboard.workspaceNavigation")}
          className={`flex-1 overflow-y-auto ${
            isSuperAdmin ? "space-y-1.5 p-4" : "px-3 py-4"
          }`}
        >
          {!isSuperAdmin && (
            <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              {t("dashboard.core")}
            </p>
          )}
          <Link
            to={config.homeTo}
            activeOptions={{ exact: true }}
            activeProps={
              isSuperAdmin
                ? { className: "bg-primary-light text-primary" }
                : undefined
            }
            onClick={closeMobileNavigation}
            className={
              isSuperAdmin
                ? "flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-base font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
                : "flex min-h-9 items-center gap-2.5 rounded-control border-l-2 border-primary bg-primary-light px-3 text-xs font-semibold text-primary"
            }
          >
            <LayoutDashboard size={isSuperAdmin ? 24 : 17} aria-hidden="true" />
            {t("dashboard.dashboard")}
          </Link>

          {!isSuperAdmin && (
            <p className="mb-2 mt-6 px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              {t("dashboard.modules")}
            </p>
          )}
          <ul className={isSuperAdmin ? "space-y-1.5" : "space-y-1"}>
            {navigation.map(({ id, icon: Icon, label, route }) => (
              <li key={id}>
                <Link
                  to={route}
                  params={{ module: id }}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      isSuperAdmin
                        ? "bg-primary-light text-primary"
                        : "border-l-2 border-primary bg-primary-light font-semibold text-primary",
                  }}
                  onClick={closeMobileNavigation}
                  className={
                    isSuperAdmin
                      ? "flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-base font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
                      : "flex min-h-9 w-full items-center gap-2.5 rounded-control border-l-2 border-transparent px-3 text-left text-xs font-medium text-text-muted transition-colors hover:bg-background hover:text-text"
                  }
                >
                  <Icon size={isSuperAdmin ? 24 : 17} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex min-w-0 items-center gap-2.5 rounded-card border border-border bg-background p-2">
            <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white ring-1 ring-border">
              {profileInitials || <RoleIcon size={15} aria-hidden="true" />}
              <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-white bg-success" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="block truncate text-[12px] font-bold leading-tight">
                  {profileName}
                </span>
                <span className="shrink-0 rounded-control bg-success-bg px-1 py-0.5 text-[8px] font-bold uppercase tracking-tight text-success-text">
                  {t(config.roleNameKey)}
                </span>
              </span>
              <span className="block truncate text-[10px] leading-tight text-text-muted">
                {user.email || t("dashboard.signedIn")}
              </span>
            </span>
            <DashboardButton
              variant="ghost"
              type="button"
              onClick={requestSignOut}
              aria-label={t("common.signOut")}
              title={t("common.signOut")}
              className="size-12 min-h-0 shrink-0 px-0 hover:bg-danger-bg hover:text-danger"
            >
              <LogOut size={25} aria-hidden="true" />
            </DashboardButton>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
            <DashboardButton
              variant="neutral"
              type="button"
              aria-label={t("dashboard.openNavigation")}
              aria-controls="dashboard-navigation"
              aria-expanded={mobileNavigationOpen}
              className="size-10 min-h-0 shrink-0 px-0 lg:hidden"
              onClick={() => setMobileNavigationOpen(true)}
            >
              <Menu size={19} aria-hidden="true" />
            </DashboardButton>
            <div className="hidden min-w-0 items-center gap-2 text-xs sm:flex">
              <span className="truncate text-text-muted">
                {t("dashboard.registryPlatform")}
              </span>
              <ChevronRight size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
              <span className="truncate font-semibold text-text">{pageTitle}</span>
            </div>
            <label className="relative ml-0 hidden md:ml-2 sm:block">
              <Search
                size={16}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label={t("dashboard.searchPlaceholder")}
                placeholder={t("dashboard.searchPlaceholder")}
                className="h-8 w-40 rounded-control border border-border bg-background pl-8 pr-3 text-[11px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-52 md:w-72"
              />
            </label>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            <LanguageToggle />
            <span className="mx-0.5 hidden h-4 w-px bg-border sm:block" />
            <DashboardButton
              variant="ghost"
              type="button"
              aria-label={t("dashboard.help")}
              title={t("dashboard.help")}
              className="size-12 min-h-0 px-0"
            >
              <CircleHelp size={28} aria-hidden="true" />
            </DashboardButton>
            <DashboardButton
              variant="ghost"
              type="button"
              aria-label={t("dashboard.notifications")}
              title={t("dashboard.notifications")}
              className="relative size-12 min-h-0 px-0"
            >
              <Bell size={30} aria-hidden="true" />
              <span className="absolute right-2 top-2 size-2 rounded-full border border-white bg-danger" />
            </DashboardButton>
            <div className="relative" ref={profileRef}>
              <DashboardButton
                variant="neutral"
                type="button"
                aria-label={t("dashboard.profileMenu")}
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                onClick={() => setProfileMenuOpen((open) => !open)}
                className="h-9 min-h-0 gap-1.5 border-transparent px-1.5"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {profileInitials || <RoleIcon size={14} aria-hidden="true" />}
                </span>
                <span className="hidden max-w-32 truncate text-[11px] font-semibold lg:block">
                  {profileName}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-text-muted transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </DashboardButton>
              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-64 rounded-card border border-border bg-surface py-1.5 shadow-floating"
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
                        className="mt-1 h-9 w-full rounded-control border border-border bg-background px-2 text-xs text-text"
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
                    onClick={requestSignOut}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-xs font-medium text-danger transition-colors hover:bg-danger-bg"
                  >
                    <LogOut size={25} aria-hidden="true" />
                    {t("common.signOut")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main
          className={`mx-auto min-w-0 w-full flex-1 space-y-6 p-4 md:p-6 lg:p-8 ${
            isSuperAdmin ? "max-w-[1600px]" : "max-w-7xl"
          }`}
        >
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
      {signOutConfirmationOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-text/45 p-4 backdrop-blur-sm">
          <div
            ref={signOutDialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-dialog-title"
            aria-describedby="sign-out-dialog-description"
            className="w-full max-w-md rounded-card border border-border bg-surface p-6 shadow-floating sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-danger-bg text-danger">
                <LogOut size={23} aria-hidden="true" />
              </span>
              <div className="min-w-0 pt-0.5">
                <h2
                  id="sign-out-dialog-title"
                  className="text-heading font-semibold text-text"
                >
                  {t("common.confirmSignOutTitle")}
                </h2>
                <p
                  id="sign-out-dialog-description"
                  className="mt-2 text-small leading-relaxed text-text-muted"
                >
                  {t("common.confirmSignOutMessage")}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <DashboardButton
                variant="neutral"
                type="button"
                onClick={() => setSignOutConfirmationOpen(false)}
                className="w-full sm:w-auto sm:min-w-28"
              >
                {t("common.cancel")}
              </DashboardButton>
              <DashboardButton
                variant="danger"
                type="button"
                onClick={() => void signOut()}
                className="w-full sm:w-auto sm:min-w-28"
              >
                {t("common.confirmSignOut")}
              </DashboardButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
