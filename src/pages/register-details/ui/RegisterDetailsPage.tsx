import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@shared/ui";

export function RegisterDetailsPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-content p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-title font-semibold">
          {t("auth.locationSecurity")}
        </h1>
        <LanguageToggle />
      </div>
      <Link
        to="/register/role"
        className="mt-4 inline-block text-body text-primary"
      >
        {t("common.back")}
      </Link>
    </div>
  );
}