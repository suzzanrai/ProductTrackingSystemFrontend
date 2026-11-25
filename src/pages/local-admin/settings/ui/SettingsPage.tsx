import { DashboardModulePage } from "@widgets/dashboard-overview";
import { localAdminDashboard } from "../../model/navigation";

export function SettingsPage() {
  return <DashboardModulePage config={localAdminDashboard} moduleId="settings" />;
}
