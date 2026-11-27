import { DashboardModulePage } from "@widgets/dashboard-overview";
import { consumerDashboard } from "../../model/navigation";

export function SavedPage() {
  return <DashboardModulePage config={consumerDashboard} moduleId="saved" />;
}
