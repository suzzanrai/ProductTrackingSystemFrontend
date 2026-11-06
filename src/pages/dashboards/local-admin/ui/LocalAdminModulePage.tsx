import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../model/navigation";

export function LocalAdminModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return (
    <DashboardModulePage config={localAdminDashboard} moduleId={moduleId} />
  );
}
