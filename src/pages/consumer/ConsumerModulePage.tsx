import { useRouterState } from "@tanstack/react-router";
import { HistoryPage } from "./history/ui/HistoryPage";
import { SavedPage } from "./saved/ui/SavedPage";
import { ScanPage } from "./scan/ui/ScanPage";

const modulePages = {
  scan: ScanPage,
  history: HistoryPage,
  saved: SavedPage,
} as const;

export function ConsumerModulePage() {
  const moduleId = useRouterState({
    select: (state) => state.location.pathname.split("/").at(-1) ?? "",
  });

  const Page = modulePages[moduleId as keyof typeof modulePages] ?? ScanPage;
  return <Page />;
}
