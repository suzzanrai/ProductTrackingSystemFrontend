import { DashboardModulePage } from "@widgets/dashboard-overview";
import { wholesalerDashboard } from "../../model/navigation";

export function OrdersPage() {
  return <DashboardModulePage config={wholesalerDashboard} moduleId="orders" />;
}
