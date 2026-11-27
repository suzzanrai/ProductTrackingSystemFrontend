import { useRouterState } from "@tanstack/react-router";
import { CertificationsPage } from "./certifications/ui/CertificationsPage";
import { FarmsPage } from "./farms/ui/FarmsPage";
import { HarvestsPage } from "./harvests/ui/HarvestsPage";

const modulePages = {
  farms: FarmsPage,
  harvests: HarvestsPage,
  certifications: CertificationsPage,
} as const;

export function FarmerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? FarmsPage;
  return <Page />;
}
