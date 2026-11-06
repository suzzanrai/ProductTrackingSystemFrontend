import { useRouterState } from "@tanstack/react-router";
import { DashboardModulePage } from "@widgets/dashboard-overview";
import { superAdminDashboard } from "../model/navigation";

export function SuperAdminModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  return (
    <DashboardModulePage config={superAdminDashboard} moduleId={moduleId} />
  );
}
