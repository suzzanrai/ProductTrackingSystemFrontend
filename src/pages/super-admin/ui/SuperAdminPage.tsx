import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { clearAuthSession } from "@shared/lib";

export function SuperAdminPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signOut = async () => {
    clearAuthSession();
    await navigate({ to: "/login", replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <section className="w-full max-w-xl rounded-card border bg-surface p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-title font-semibold text-text">
              {t("superAdmin.title")}
            </h1>
            <p className="text-body text-text-muted">
              {t("superAdmin.welcome")}
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex h-control shrink-0 items-center gap-2 rounded-control border px-4 text-small font-medium text-text hover:bg-background"
          >
            <LogOut size={18} />
            {t("common.signOut")}
          </button>
        </div>
      </section>
    </main>
  );
}
