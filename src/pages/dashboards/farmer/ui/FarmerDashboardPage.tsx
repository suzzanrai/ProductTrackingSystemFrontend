import { DashboardOverview } from "@widgets/dashboard-overview";
import { farmerDashboard } from "../model/navigation";

export function FarmerDashboardPage() {
  return <DashboardOverview config={farmerDashboard} />;
}
