import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FormDialog } from "../../components/FormDialog";
import { Field, fieldClassName } from "../../components/Field";
import type { MaterialCategory } from "../../categories/api/categories";
import type { Material, MaterialWrite } from "../api/materials";
import type { MaterialUnit } from "../../unit/api/units";
import {
  ProductUnitSelector,
  type UnitAssignmentDraft,
} from "./ProductUnitSelector";

export type ProductValues = MaterialWrite;

interface ProductFormDialogProps {
  product: Material | null;
  categories: MaterialCategory[];
  units: MaterialUnit[];
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
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language.startsWith("ne");
  const [nameEn, setNameEn] = useState(product?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(product?.nameNp ?? "");
  const [categoryId, setCategoryId] = useState(
    product?.materialCategoryId ?? "",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const initialAssignments: UnitAssignmentDraft[] =
    product?.units.map((unit) => ({
      unitId: unit.unitId,
      conversionFactorToBaseUnit: String(unit.conversionFactorToBaseUnit),
    })) ?? [];
  const [unitAssignments, setUnitAssignments] =
    useState<UnitAssignmentDraft[]>(initialAssignments);
  const [baseUnitId, setBaseUnitId] = useState(
    product?.units.find((unit) => unit.isBaseUnit)?.unitId ??
      initialAssignments[0]?.unitId ??
      "",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoryId || unitAssignments.length === 0 || !baseUnitId) return;

    const hasInvalidFactor = unitAssignments.some((assignment) => {
      if (assignment.unitId === baseUnitId) return false;
      const factor = Number(assignment.conversionFactorToBaseUnit);
      return !Number.isFinite(factor) || factor <= 0;
    });
    if (hasInvalidFactor) return;

    const assignedUnits = unitAssignments.map((assignment) => {
      return {
        unitId: assignment.unitId,
        conversionFactorToBaseUnit:
          assignment.unitId === baseUnitId
            ? 1
            : Number(assignment.conversionFactorToBaseUnit),
        isBaseUnit: assignment.unitId === baseUnitId,
      };
    });

    onSave({
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      materialCategoryId: categoryId,
      description: description.trim() || null,
      units: assignedUnits,
    });
  }

  return (
    <FormDialog
      title={t(
        `dashboard.superAdminPages.${product ? "editProduct" : "addProduct"}`,
      )}
      submitLabel={t(
        product ? "dashboard.superAdminPages.update" : "common.save",
      )}
      maxWidth="900px"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {(markDirty) => (
        <>
          <div className="grid gap-4 rounded-card border border-border bg-background/40 p-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label={t("dashboard.superAdminPages.nameEn")} value={nameEn} onChange={setNameEn} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.nameNp")} value={nameNp} onChange={setNameNp} onDirty={markDirty} />
            <label className="block min-w-0 space-y-1.5">
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
                className={`${fieldClassName} px-3 text-sm`}
              >
                <option value="">
                  {t("dashboard.superAdminPages.selectCategory")}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {isNepali ? category.nameNp : category.nameEn}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <ProductUnitSelector
            units={units}
            assignments={unitAssignments}
            baseUnitId={baseUnitId}
            onChange={(assignments, nextBaseUnitId) => {
              setUnitAssignments(assignments);
              setBaseUnitId(nextBaseUnitId);
            }}
            onDirty={markDirty}
          />
          <label className="block space-y-1.5 rounded-card border border-border p-4">
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
