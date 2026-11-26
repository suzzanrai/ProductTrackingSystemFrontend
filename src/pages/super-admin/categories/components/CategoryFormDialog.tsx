import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { MaterialCategory } from "../api/categories";

export interface CategoryValues {
  nameEn: string;
  nameNp: string;
  code: string | null;
  description: string | null;
  parentCategoryId: string | null;
}

interface CategoryFormDialogProps {
  category: MaterialCategory | null;
  onClose: () => void;
  onSave: (values: CategoryValues) => void;
  categories: MaterialCategory[];
}

export function CategoryFormDialog({
  category,
  onClose,
  onSave,
  categories,
}: CategoryFormDialogProps) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState(category?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(category?.nameNp ?? "");
  const [code, setCode] = useState(category?.code ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [parentCategoryId, setParentCategoryId] = useState(category?.parentCategoryId ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      code: code.trim() || null,
      description: description.trim() || null,
      parentCategoryId: parentCategoryId || null,
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
            <span className="text-sm font-medium text-text-muted">{t("dashboard.superAdminPages.parentCategory")}</span>
            <select value={parentCategoryId} onChange={(event) => { markDirty(); setParentCategoryId(event.target.value); }} className="w-full rounded-control border border-border bg-surface px-3 py-2.5 text-text">
              <option value="">{t("dashboard.superAdminPages.noParentCategory")}</option>
              {categories.filter((item) => item.id !== category?.id).map((item) => <option key={item.id} value={item.id}>{item.nameEn}</option>)}
            </select>
          </label>
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
