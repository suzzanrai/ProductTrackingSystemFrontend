import { useTranslation } from "react-i18next";
import { DashboardButton } from "@shared/ui";

interface DeleteDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({ onCancel, onConfirm }: DeleteDialogProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-[400px] space-y-4 rounded-card border border-border bg-surface p-6"
      >
        <div>
          <h2 id="delete-title" className="text-lg font-semibold text-text">
            {t("dashboard.superAdminPages.confirmDelete")}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {t("dashboard.superAdminPages.deleteWarning")}
          </p>
        </div>
        <footer className="flex justify-end gap-3 border-t border-border pt-4">
          <DashboardButton
            variant="neutral"
            type="button"
            onClick={onCancel}
            className="min-h-10 px-4 text-sm"
          >
            {t("common.cancel")}
          </DashboardButton>
          <DashboardButton
            variant="danger"
            type="button"
            onClick={onConfirm}
            className="min-h-10 px-4 text-sm"
          >
            {t("dashboard.superAdminPages.delete")}
          </DashboardButton>
        </footer>
      </section>
    </div>
  );
}
