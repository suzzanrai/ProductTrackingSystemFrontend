import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FormDialog } from "../../components/FormDialog";
import { Field, fieldClassName } from "../../components/Field";
import type {
  MockCategory,
  MockProduct,
  MockUnit,
} from "../../model/mock-data";

export type ProductValues = Omit<MockProduct, "id" | "usedCount">;

interface ProductFormDialogProps {
  product: MockProduct | null;
  categories: MockCategory[];
  units: MockUnit[];
  onClose: () => void;
  onSave: (values: ProductValues) => void;
}

export function ProductFormDialog({
  product,
  categories,
  units,
  onClose,
  onSave,
}: ProductFormDialogProps) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState(product?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(product?.nameNp ?? "");
  const [categoryId, setCategoryId] = useState(
    String(product?.categoryId ?? ""),
  );
  const [selectedUnits, setSelectedUnits] = useState<string[]>(
    product?.units ?? ["kg"],
  );
  const [descEn, setDescEn] = useState(product?.descEn ?? "");
  const [descNp, setDescNp] = useState(product?.descNp ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoryId || selectedUnits.length === 0) return;
    onSave({
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      categoryId: Number(categoryId),
      units: selectedUnits,
      descEn: descEn.trim() || nameEn.trim(),
      descNp: descNp.trim() || nameNp.trim(),
    });
  }

  return (
    <FormDialog
      title={t(
        `dashboard.superAdminPages.${product ? "editProduct" : "addProduct"}`,
      )}
      submitLabel={t(
        product
          ? "dashboard.superAdminPages.update"
          : "common.save",
      )}
      maxWidth="760px"
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
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.category")} *
            </span>
            <select
              required
              value={categoryId}
              onChange={(event) => {
                markDirty();
                setCategoryId(event.target.value);
              }}
              className={fieldClassName}
            >
              <option value="">
                {t("dashboard.superAdminPages.selectCategory")}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameEn}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.units")} *
            </legend>
            <p className="text-xs text-text-muted">
              {t("dashboard.superAdminPages.multipleUnits")}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {units.map((unit) => {
                const selected = selectedUnits.includes(unit.shortEn);
                return (
                  <button
                    key={unit.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      markDirty();
                      setSelectedUnits((current) =>
                        selected
                          ? current.filter((key) => key !== unit.shortEn)
                          : [...current, unit.shortEn],
                      );
                    }}
                    className={`flex h-10 items-center gap-2 rounded-control border px-4 text-sm font-medium transition-colors ${
                      selected
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border bg-surface text-text hover:border-primary"
                    }`}
                  >
                    {unit.nameEn} ({unit.shortEn})
                  </button>
                );
              })}
            </div>
            {selectedUnits.length === 0 && (
              <p className="text-xs text-danger">
                {t("dashboard.superAdminPages.chooseUnit")}
              </p>
            )}
          </fieldset>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-muted">
                {t("dashboard.superAdminPages.descriptionEn")}
              </span>
              <textarea
                rows={3}
                value={descEn}
                onChange={(event) => {
                  markDirty();
                  setDescEn(event.target.value);
                }}
                className="w-full rounded-control border border-border bg-surface p-3 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-muted">
                {t("dashboard.superAdminPages.descriptionNp")}
              </span>
              <textarea
                rows={3}
                value={descNp}
                onChange={(event) => {
                  markDirty();
                  setDescNp(event.target.value);
                }}
                className="w-full rounded-control border border-border bg-surface p-3 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </label>
          </div>
        </>
      )}
    </FormDialog>
  );
}
