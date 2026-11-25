import { DashboardModulePage } from "@widgets/dashboard-overview";
import { collectorDashboard } from "../../model/navigation";

export function PartnersPage() {
  return <DashboardModulePage config={collectorDashboard} moduleId="partners" />;
}
