import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminDashboardPage } from "@pages/super-admin";

export const Route = createFileRoute("/_authenticated/super-admin/dashboard")({
  component: SuperAdminDashboardPage,
});
