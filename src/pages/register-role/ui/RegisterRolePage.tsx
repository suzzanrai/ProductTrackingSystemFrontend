import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@shared/ui";

export function RegisterRolePage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-content p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-title font-semibold">{t("auth.chooseRole")}</h1>
        <LanguageToggle />
      </div>
      <div className="mt-4 flex gap-4">
        <Link to="/login" className="text-body text-primary">
          {t("common.back")}
        </Link>
        <Link to="/register/details" className="text-body text-primary">
          {t("common.next")}
        </Link>
      </div>
    </div>
  );
}