import { useRouterState } from "@tanstack/react-router";
import { InventoryPage } from "./inventory/ui/InventoryPage";
import { OrdersPage } from "./orders/ui/OrdersPage";
import { SuppliersPage } from "./suppliers/ui/SuppliersPage";

const modulePages = {
  suppliers: SuppliersPage,
  inventory: InventoryPage,
  orders: OrdersPage,
} as const;

export function WholesalerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? SuppliersPage;
  return <Page />;
}
