import { DashboardModulePage } from "@widgets/dashboard-overview";
import { wholesalerDashboard } from "../../model/navigation";

export function SuppliersPage() {
  return <DashboardModulePage config={wholesalerDashboard} moduleId="suppliers" />;
}
