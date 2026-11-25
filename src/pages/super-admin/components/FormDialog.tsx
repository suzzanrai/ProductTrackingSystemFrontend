import { useState, type FormEventHandler, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DashboardButton } from "@shared/ui";

interface FormDialogProps {
  title: string;
  submitLabel: string;
  maxWidth?: "560px" | "760px";
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: (markDirty: () => void) => ReactNode;
}

export function FormDialog({
  title,
  submitLabel,
  maxWidth = "560px",
  onClose,
  onSubmit,
  children,
}: FormDialogProps) {
  const { t } = useTranslation();
  const [dirty, setDirty] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  function requestClose() {
    if (dirty) {
      setConfirmDiscard(true);
      return;
    }

    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm sm:p-6">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="super-admin-form-title"
          className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-card border border-border bg-surface"
          style={{ maxWidth }}
        >
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
            <h2
              id="super-admin-form-title"
              className="text-xl font-semibold text-text"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={requestClose}
              aria-label={t("common.cancel")}
              className="flex size-9 items-center justify-center rounded-control text-text-muted hover:bg-background hover:text-text"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          <form onSubmit={onSubmit} className="space-y-6 overflow-y-auto p-6">
            {children(() => setDirty(true))}
            <footer className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end">
              <DashboardButton
                variant="secondary"
                type="button"
                onClick={requestClose}
                className="px-6"
              >
                {t("common.cancel")}
              </DashboardButton>
              <DashboardButton type="submit" className="px-8">
                {submitLabel}
              </DashboardButton>
            </footer>
          </form>
        </section>
      </div>
      {confirmDiscard && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="discard-changes-title"
            aria-describedby="discard-changes-message"
            className="w-full max-w-[400px] space-y-4 rounded-card border border-border bg-surface p-6"
          >
            <div>
              <h2
                id="discard-changes-title"
                className="text-lg font-semibold text-text"
              >
                {t("dashboard.superAdminPages.discardChangesTitle")}
              </h2>
              <p
                id="discard-changes-message"
                className="mt-1 text-sm text-text-muted"
              >
                {t("dashboard.superAdminPages.discardChangesMessage")}
              </p>
            </div>
            <footer className="flex justify-end gap-3 border-t border-border pt-4">
              <DashboardButton
                variant="neutral"
                type="button"
                onClick={() => setConfirmDiscard(false)}
                className="min-h-10 px-4 text-sm"
              >
                {t("dashboard.superAdminPages.keepEditing")}
              </DashboardButton>
              <DashboardButton
                variant="danger"
                type="button"
                onClick={onClose}
                className="min-h-10 px-4 text-sm"
              >
                {t("dashboard.superAdminPages.discardChanges")}
              </DashboardButton>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
