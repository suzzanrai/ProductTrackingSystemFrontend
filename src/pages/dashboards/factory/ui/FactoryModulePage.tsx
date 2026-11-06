import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { factoryDashboard } from "../model/navigation";

export function FactoryModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return <DashboardModulePage config={factoryDashboard} moduleId={moduleId} />;
}
