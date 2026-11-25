import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { MockCategory } from "../../model/mock-data";

export type CategoryValues = Omit<MockCategory, "id">;

interface CategoryFormDialogProps {
  category: MockCategory | null;
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ nameEn: nameEn.trim(), nameNp: nameNp.trim() });
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
        </>
      )}
    </FormDialog>
  );
}
