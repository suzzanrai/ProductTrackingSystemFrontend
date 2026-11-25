import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../../model/navigation";

export function ApprovalsPage() {
  return <DashboardModulePage config={localAdminDashboard} moduleId="approvals" />;
}
