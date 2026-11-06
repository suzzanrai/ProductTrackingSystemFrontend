import { DashboardOverview } from "@widgets/dashboard-overview";
import { superAdminDashboard } from "../model/navigation";

export function SuperAdminDashboardPage() {
  return <DashboardOverview config={superAdminDashboard} />;
}
