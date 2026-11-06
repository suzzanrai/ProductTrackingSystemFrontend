import { createFileRoute } from "@tanstack/react-router";
import { FactoryDashboardPage } from "@pages/dashboards/factory";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/factory/dashboard")({
  beforeLoad: () => requireBackendRole("FactoryAdmin"),
  component: FactoryDashboardPage,
});
