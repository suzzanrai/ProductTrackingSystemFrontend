import { useRouterState } from "@tanstack/react-router";
import { CollectionPage } from "./collection/ui/CollectionPage";
import { PartnersPage } from "./partners/ui/PartnersPage";
import { ShipmentsPage } from "./shipments/ui/ShipmentsPage";

const modulePages = {
  collection: CollectionPage,
  shipments: ShipmentsPage,
  partners: PartnersPage,
} as const;

export function CollectorModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? CollectionPage;
  return <Page />;
}
