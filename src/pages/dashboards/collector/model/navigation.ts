import { Scale, Truck, Users } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const collectorDashboard: DashboardOverviewConfig = {
  homeTo: "/collector/dashboard",
  moduleRoute: "/collector/$module",
  roleKey: "collector",
  roleNameKey: "roleSelect.roles.collector.title",
  roleDescriptionKey: "roleSelect.roles.collector.description",
  roleIcon: Scale,
  modules: [
    { id: "collection", icon: Scale },
    { id: "shipments", icon: Truck },
    { id: "partners", icon: Users },
  ],
};
