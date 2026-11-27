import { neSuperAdminCategories } from "./categories";
import { neSuperAdminConsole } from "./console";
import { neSuperAdminDashboard } from "./dashboard";
import { neSuperAdminLocalAdmin } from "./local-admin";
import { neSuperAdminMenu } from "./menu";
import { neSuperAdminProducts } from "./products";
import { neSuperAdminShared } from "./shared";
import { neSuperAdminUnits } from "./units";

export const neSuperAdmin = {
  superAdmin: neSuperAdminConsole,
  dashboard: {
    ...neSuperAdminDashboard,
    moduleNames: {
      superAdmin: neSuperAdminMenu,
    },
    superAdminPages: {
      ...neSuperAdminShared,
      ...neSuperAdminProducts,
      ...neSuperAdminCategories,
      ...neSuperAdminUnits,
      ...neSuperAdminLocalAdmin,
    },
  },
};
