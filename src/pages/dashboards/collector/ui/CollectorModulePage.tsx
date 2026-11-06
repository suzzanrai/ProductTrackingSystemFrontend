import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { collectorDashboard } from "../model/navigation";

export function CollectorModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return <DashboardModulePage config={collectorDashboard} moduleId={moduleId} />;
}
