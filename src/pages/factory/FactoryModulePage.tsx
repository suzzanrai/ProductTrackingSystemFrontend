import { useRouterState } from "@tanstack/react-router";
import { BatchesPage } from "./batches/ui/BatchesPage";
import { ProcessingPage } from "./processing/ui/ProcessingPage";
import { QualityPage } from "./quality/ui/QualityPage";

const modulePages = {
  processing: ProcessingPage,
  batches: BatchesPage,
  quality: QualityPage,
} as const;

export function FactoryModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? ProcessingPage;
  return <Page />;
}
