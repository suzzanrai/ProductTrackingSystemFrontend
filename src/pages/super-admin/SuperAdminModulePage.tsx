import { useRouterState } from "@tanstack/react-router";
import { CategoriesPage } from "./categories/ui/CategoriesPage";
import { LocalAdminsPage } from "./local-admin/ui/LocalAdminsPage";
import { ProductsPage } from "./products/ui/ProductsPage";
import { UnitsPage } from "./unit/ui/UnitsPage";

export function SuperAdminModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });
  switch (moduleId) {
    case "categories":
      return <CategoriesPage />;
    case "units":
      return <UnitsPage />;
    case "localAdmin":
      return <LocalAdminsPage />;
    case "products":
    default:
      return <ProductsPage />;
  }
}
