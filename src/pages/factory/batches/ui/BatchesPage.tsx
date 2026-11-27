import { DashboardModulePage } from "@widgets/dashboard-overview";
import { factoryDashboard } from "../../model/navigation";

export function BatchesPage() {
  return <DashboardModulePage config={factoryDashboard} moduleId="batches" />;
}
