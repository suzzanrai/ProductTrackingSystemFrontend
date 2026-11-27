import { DashboardModulePage } from "@widgets/dashboard-overview";
import { farmerDashboard } from "../../model/navigation";

export function CertificationsPage() {
  return <DashboardModulePage config={farmerDashboard} moduleId="certifications" />;
}
