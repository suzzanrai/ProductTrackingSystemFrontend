import { DashboardModulePage } from "@widgets/dashboard-overview";
import { factoryDashboard } from "../../model/navigation";

export function QualityPage() {
  return <DashboardModulePage config={factoryDashboard} moduleId="quality" />;
}
