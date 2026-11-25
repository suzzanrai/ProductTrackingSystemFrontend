import { DashboardModulePage } from "@widgets/dashboard-overview";
import { collectorDashboard } from "../../model/navigation";

export function CollectionPage() {
  return <DashboardModulePage config={collectorDashboard} moduleId="collection" />;
}
