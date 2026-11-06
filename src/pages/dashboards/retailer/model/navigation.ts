import { QrCode, ShoppingBasket, Store } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const retailerDashboard: DashboardOverviewConfig = {
  homeTo: "/retailer/dashboard",
  moduleRoute: "/retailer/$module",
  roleKey: "retailer",
  roleNameKey: "roleSelect.roles.retailer.title",
  roleDescriptionKey: "roleSelect.roles.retailer.description",
  roleIcon: Store,
  modules: [
    { id: "stock", icon: Store },
    { id: "sales", icon: ShoppingBasket },
    { id: "traceability", icon: QrCode },
  ],
};
