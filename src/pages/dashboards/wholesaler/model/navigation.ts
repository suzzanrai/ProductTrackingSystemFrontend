import { ClipboardList, Users, Warehouse } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const wholesalerDashboard: DashboardOverviewConfig = {
  homeTo: "/wholesaler/dashboard",
  moduleRoute: "/wholesaler/$module",
  roleKey: "wholesaler",
  roleNameKey: "roleSelect.roles.wholesaler.title",
  roleDescriptionKey: "roleSelect.roles.wholesaler.description",
  roleIcon: Warehouse,
  modules: [
    { id: "suppliers", icon: Users },
    { id: "inventory", icon: Warehouse },
    { id: "orders", icon: ClipboardList },
  ],
};
