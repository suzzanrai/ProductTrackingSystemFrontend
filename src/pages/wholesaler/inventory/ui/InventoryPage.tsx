import { DashboardModulePage } from "@widgets/dashboard-overview";
import { wholesalerDashboard } from "../../model/navigation";

export function InventoryPage() {
  return <DashboardModulePage config={wholesalerDashboard} moduleId="inventory" />;
}
