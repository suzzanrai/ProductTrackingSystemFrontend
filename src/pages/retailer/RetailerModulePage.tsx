import { useRouterState } from "@tanstack/react-router";
import { SalesPage } from "./sales/ui/SalesPage";
import { StockPage } from "./stock/ui/StockPage";
import { TraceabilityPage } from "./traceability/ui/TraceabilityPage";

const modulePages = {
  stock: StockPage,
  sales: SalesPage,
  traceability: TraceabilityPage,
} as const;

export function RetailerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? StockPage;
  return <Page />;
}
