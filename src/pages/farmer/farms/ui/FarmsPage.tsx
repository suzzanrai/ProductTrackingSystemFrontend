import { DashboardModulePage } from "@widgets/dashboard-overview";
import { farmerDashboard } from "../../model/navigation";

export function FarmsPage() {
  return <DashboardModulePage config={farmerDashboard} moduleId="farms" />;
}
