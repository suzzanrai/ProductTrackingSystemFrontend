import { createFileRoute } from "@tanstack/react-router";
import { LocalAdminDashboardPage } from "@pages/dashboards/local-admin";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/local-admin/dashboard")({
  beforeLoad: () => requireBackendRole("LocalAdmin"),
  component: LocalAdminDashboardPage,
});
