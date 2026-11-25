import { ClipboardCheck, Leaf, Package, Tractor } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const farmerDashboard: DashboardOverviewConfig = {
  homeTo: "/farmer/dashboard",
  moduleRoute: "/farmer/$module",
  roleKey: "farmer",
  roleNameKey: "roleSelect.roles.farmer.title",
  roleDescriptionKey: "roleSelect.roles.farmer.description",
  roleIcon: Tractor,
  modules: [
    { id: "farms", icon: Leaf },
    { id: "harvests", icon: Package },
    { id: "certifications", icon: ClipboardCheck },
  ],
};
