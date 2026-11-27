import { useRouterState } from "@tanstack/react-router";
import { ApprovalsPage } from "./approvals/ui/ApprovalsPage";
import { ProductsPage } from "./products/ui/ProductsPage";
import { ReportsPage } from "./reports/ui/ReportsPage";
import { SettingsPage } from "./settings/ui/SettingsPage";
import { UsersPage } from "./users/ui/UsersPage";

const modulePages = {
  users: UsersPage,
  approvals: ApprovalsPage,
  products: ProductsPage,
  reports: ReportsPage,
  settings: SettingsPage,
} as const;

export function LocalAdminModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? UsersPage;
  return <Page />;
}
