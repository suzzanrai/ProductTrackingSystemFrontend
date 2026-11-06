import { createFileRoute } from "@tanstack/react-router";
import { FarmerDashboardPage } from "@pages/dashboards/farmer";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/farmer/dashboard")({
  beforeLoad: () => requireBackendRole("Farmer"),
  component: FarmerDashboardPage,
});
