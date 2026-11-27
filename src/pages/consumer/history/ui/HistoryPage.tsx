import { DashboardModulePage } from "@widgets/dashboard-overview";
import { consumerDashboard } from "../../model/navigation";

export function HistoryPage() {
  return <DashboardModulePage config={consumerDashboard} moduleId="history" />;
}
