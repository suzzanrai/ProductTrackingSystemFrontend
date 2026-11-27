import { DashboardModulePage } from "@widgets/dashboard-overview";
import { retailerDashboard } from "../../model/navigation";

export function SalesPage() {
  return <DashboardModulePage config={retailerDashboard} moduleId="sales" />;
}
