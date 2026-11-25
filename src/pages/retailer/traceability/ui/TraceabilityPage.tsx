import { DashboardModulePage } from "@widgets/dashboard-overview";
import { retailerDashboard } from "../../model/navigation";

export function TraceabilityPage() {
  return <DashboardModulePage config={retailerDashboard} moduleId="traceability" />;
}
