import { DashboardOverview } from "@widgets/dashboard-overview";
import { collectorDashboard } from "../model/navigation";

export function CollectorDashboardPage() {
  return <DashboardOverview config={collectorDashboard} />;
}
