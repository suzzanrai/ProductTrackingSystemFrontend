import { DashboardModulePage } from "@widgets/dashboard-overview";
import { factoryDashboard } from "../../model/navigation";

export function ProcessingPage() {
  return <DashboardModulePage config={factoryDashboard} moduleId="processing" />;
}
