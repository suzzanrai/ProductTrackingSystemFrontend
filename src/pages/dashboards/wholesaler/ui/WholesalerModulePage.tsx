import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { wholesalerDashboard } from "../model/navigation";

export function WholesalerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return (
    <DashboardModulePage config={wholesalerDashboard} moduleId={moduleId} />
  );
}
