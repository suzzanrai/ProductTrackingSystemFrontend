import { DashboardOverview } from "@widgets/dashboard-overview";
import { consumerDashboard } from "../model/navigation";

export function ConsumerDashboardPage() {
  return <DashboardOverview config={consumerDashboard} />;
}
