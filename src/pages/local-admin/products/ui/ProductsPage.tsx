import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../../model/navigation";

export function ProductsPage() {
  return <DashboardModulePage config={localAdminDashboard} moduleId="products" />;
}
