import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { consumerDashboard } from "../model/navigation";

export function ConsumerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return <DashboardModulePage config={consumerDashboard} moduleId={moduleId} />;
}
