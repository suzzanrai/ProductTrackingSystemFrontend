import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@shared/ui";

export const Route = createFileRoute("/")({
  component: TestPage,
});

function TestPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-content p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-title font-semibold">{t("app.name")}</h1>
        <LanguageToggle />
      </div>

      <p className="mt-2 text-body text-text-muted">{t("test.description")}</p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button className="min-h-control rounded-control bg-primary px-6 py-2 text-body font-medium text-white hover:bg-primary-dark">
          {t("common.save")}
        </button>
        <button className="min-h-control rounded-control border border-primary bg-surface px-6 py-2 text-body font-medium text-primary">
          {t("common.cancel")}
        </button>
        <button className="min-h-control max-w-60 rounded-control bg-primary px-6 py-2 text-body font-medium text-white hover:bg-primary-dark">
          {t("test.longButton")}
        </button>
      </div>
    </div>
  );
}