import { DashboardOverview } from "@widgets/dashboard-overview";
import { wholesalerDashboard } from "../model/navigation";

export function WholesalerDashboardPage() {
  return <DashboardOverview config={wholesalerDashboard} />;
}
