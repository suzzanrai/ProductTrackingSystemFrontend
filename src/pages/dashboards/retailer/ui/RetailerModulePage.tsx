import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { retailerDashboard } from "../model/navigation";

export function RetailerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return <DashboardModulePage config={retailerDashboard} moduleId={moduleId} />;
}
