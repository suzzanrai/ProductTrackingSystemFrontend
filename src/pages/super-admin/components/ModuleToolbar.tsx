import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ModuleToolbarProps {
  onSearch: (value: string) => void;
  actionLabel: string;
  actionIcon: ReactNode;
  onAction: () => void;
}

export function ModuleToolbar({
  onSearch,
  actionLabel,
  actionIcon,
  onAction,
}: ModuleToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <label className="relative w-full md:max-w-sm">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-3 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          onChange={(event) => onSearch(event.target.value)}
          placeholder={t("dashboard.superAdminPages.search")}
          aria-label={t("dashboard.superAdminPages.search")}
          className="h-11 w-full rounded-control border border-border bg-surface pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      </label>
      <button
        type="button"
        onClick={onAction}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-control bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark md:w-auto"
      >
        {actionIcon}
        {actionLabel}
      </button>
    </div>
  );
}
