import { enDashboardCommon } from "./common";
import { enCollectorMenu } from "./menus/collector";
import { enConsumerMenu } from "./menus/consumer";
import { enFactoryMenu } from "./menus/factory";
import { enFarmerMenu } from "./menus/farmer";
import { enLocalAdminMenu } from "./menus/local-admin";
import { enRetailerMenu } from "./menus/retailer";
import { enWholesalerMenu } from "./menus/wholesaler";

export const enDashboard = {
  ...enDashboardCommon,
  moduleNames: {
    farmer: enFarmerMenu,
    collector: enCollectorMenu,
    factory: enFactoryMenu,
    wholesaler: enWholesalerMenu,
    retailer: enRetailerMenu,
    consumer: enConsumerMenu,
    localAdmin: enLocalAdminMenu,
  },
};
