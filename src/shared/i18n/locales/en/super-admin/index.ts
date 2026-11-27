import { enSuperAdminCategories } from "./categories";
import { enSuperAdminConsole } from "./console";
import { enSuperAdminDashboard } from "./dashboard";
import { enSuperAdminLocalAdmin } from "./local-admin";
import { enSuperAdminMenu } from "./menu";
import { enSuperAdminProducts } from "./products";
import { enSuperAdminShared } from "./shared";
import { enSuperAdminUnits } from "./units";

export const enSuperAdmin = {
  superAdmin: enSuperAdminConsole,
  dashboard: {
    ...enSuperAdminDashboard,
    moduleNames: {
      superAdmin: enSuperAdminMenu,
    },
    superAdminPages: {
      ...enSuperAdminShared,
      ...enSuperAdminProducts,
      ...enSuperAdminCategories,
      ...enSuperAdminUnits,
      ...enSuperAdminLocalAdmin,
    },
  },
};
