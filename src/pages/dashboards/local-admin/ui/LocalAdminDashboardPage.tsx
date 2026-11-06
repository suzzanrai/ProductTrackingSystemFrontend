import { DashboardOverview } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../model/navigation";

export function LocalAdminDashboardPage() {
  return <DashboardOverview config={localAdminDashboard} />;
}
