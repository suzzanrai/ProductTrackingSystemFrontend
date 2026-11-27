import { DashboardModulePage } from "@widgets/dashboard-overview";
import { retailerDashboard } from "../../model/navigation";

export function StockPage() {
  return <DashboardModulePage config={retailerDashboard} moduleId="stock" />;
}
