import { DashboardOverview } from "@widgets/dashboard-overview";
import { retailerDashboard } from "../model/navigation";

export function RetailerDashboardPage() {
  return <DashboardOverview config={retailerDashboard} />;
}
