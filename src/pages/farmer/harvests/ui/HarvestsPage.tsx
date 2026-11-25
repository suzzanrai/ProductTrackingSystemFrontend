import { DashboardModulePage } from "@widgets/dashboard-overview";
import { farmerDashboard } from "../../model/navigation";

export function HarvestsPage() {
  return <DashboardModulePage config={farmerDashboard} moduleId="harvests" />;
}
