import { DashboardModulePage } from "@widgets/dashboard-overview";
import { consumerDashboard } from "../../model/navigation";

export function ScanPage() {
  return <DashboardModulePage config={consumerDashboard} moduleId="scan" />;
}
