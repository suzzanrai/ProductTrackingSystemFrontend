import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { farmerDashboard } from "../model/navigation";

export function FarmerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return <DashboardModulePage config={farmerDashboard} moduleId={moduleId} />;
}
