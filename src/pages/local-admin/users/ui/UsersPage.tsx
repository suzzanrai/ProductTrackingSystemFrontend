import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../../model/navigation";

export function UsersPage() {
  return <DashboardModulePage config={localAdminDashboard} moduleId="users" />;
}
