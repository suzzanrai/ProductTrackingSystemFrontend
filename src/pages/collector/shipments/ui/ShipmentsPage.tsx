import { DashboardModulePage } from "@widgets/dashboard-overview";
import { collectorDashboard } from "../../model/navigation";

export function ShipmentsPage() {
  return <DashboardModulePage config={collectorDashboard} moduleId="shipments" />;
}
