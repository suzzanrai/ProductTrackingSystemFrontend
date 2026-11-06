import { Archive, ClipboardCheck, Factory } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const factoryDashboard: DashboardOverviewConfig = {
  homeTo: "/factory/dashboard",
  moduleRoute: "/factory/$module",
  roleKey: "factory",
  roleNameKey: "roleSelect.roles.factory.title",
  roleDescriptionKey: "roleSelect.roles.factory.description",
  roleIcon: Factory,
  modules: [
    { id: "processing", icon: Factory },
    { id: "batches", icon: Archive },
    { id: "quality", icon: ClipboardCheck },
  ],
};
