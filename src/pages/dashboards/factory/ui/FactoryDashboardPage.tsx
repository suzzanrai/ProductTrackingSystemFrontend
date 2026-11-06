import { DashboardOverview } from "@widgets/dashboard-overview";
import { factoryDashboard } from "../model/navigation";

export function FactoryDashboardPage() {
  return <DashboardOverview config={factoryDashboard} />;
}
