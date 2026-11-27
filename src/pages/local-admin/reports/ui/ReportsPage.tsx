import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../../model/navigation";

export function ReportsPage() {
  return <DashboardModulePage config={localAdminDashboard} moduleId="reports" />;
}
