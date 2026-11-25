import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { MaterialCategory } from "../api/categories";

export interface CategoryValues {
  nameEn: string;
  nameNp: string;
  code: string;
  description: string;
}

interface CategoryFormDialogProps {
  category: MaterialCategory | null;
  onClose: () => void;
  onSave: (values: CategoryValues) => void;
}

export function CategoryFormDialog({
  category,
  onClose,
  onSave,
}: CategoryFormDialogProps) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState(category?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(category?.nameNp ?? "");
  const [code, setCode] = useState(category?.code ?? "");
  const [description, setDescription] = useState(category?.description ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      code: code.trim(),
      description: description.trim(),
    });
  }

  return (
    <FormDialog
      title={t(
        `dashboard.superAdminPages.${category ? "editCategory" : "addCategory"}`,
      )}
      submitLabel={t(
        category ? "dashboard.superAdminPages.update" : "common.save",
      )}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {(markDirty) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label={t("dashboard.superAdminPages.nameEn")}
              value={nameEn}
              onChange={setNameEn}
              onDirty={markDirty}
            />
            <Field
              label={t("dashboard.superAdminPages.nameNp")}
              value={nameNp}
              onChange={setNameNp}
              onDirty={markDirty}
            />
          </div>
          <Field
            label={t("dashboard.superAdminPages.categoryCode")}
            value={code}
            onChange={setCode}
            onDirty={markDirty}
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.description")}
            </span>
            <textarea
              rows={3}
              value={description}
              onChange={(event) => {
                markDirty();
                setDescription(event.target.value);
              }}
              className="w-full rounded-control border border-border bg-surface p-3 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
        </>
      )}
    </FormDialog>
  );
}
