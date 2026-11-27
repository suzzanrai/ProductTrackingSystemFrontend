import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../../api/response";
import { ApiStatus } from "../../components/ApiStatus";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useCreateUnit,
  useDeleteUnit,
  useUnitCategories,
  useUnits,
  useUpdateUnit,
  type MaterialUnit,
} from "../api/units";
import { UnitFormDialog, type UnitValues } from "../components/UnitFormDialog";
import { UnitsTable } from "../components/UnitsTable";

export function UnitsPage() {
  const { t, i18n } = useTranslation();
  const unitsQuery = useUnits();
  const unitCategoriesQuery = useUnitCategories();
  const createUnit = useCreateUnit();
  const updateUnit = useUpdateUnit();
  const deleteUnit = useDeleteUnit();
  const unitCategories = unitCategoriesQuery.data ?? [];
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<MaterialUnit | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");

  const filteredUnits = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (unitsQuery.data ?? []).filter((unit) =>
      `${unit.nameEn} ${unit.nameNp} ${unit.abbreviation} ${unit.unitCategoryNameEn ?? ""} ${unit.unitCategoryNameNp ?? ""}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [search, unitsQuery.data]);

  function openCreate() {
    setEditingUnit(null);
    setFormOpen(true);
  }

  async function saveUnit(values: UnitValues) {
    try {
      if (editingUnit) {
        await updateUnit.mutateAsync({ id: editingUnit.id, values });
      } else {
        await createUnit.mutateAsync(values);
      }
      setFormOpen(false);
      showToast(t("dashboard.superAdminPages.saved"));
    } catch (error) {
      showToast(
        getApiErrorMessage(error) ??
          t("dashboard.superAdminPages.saveFailed"),
      );
    }
  }

  async function confirmDelete() {
    if (deleteId === null) return;
    try {
      await deleteUnit.mutateAsync(deleteId);
      setDeleteId(null);
      showToast(t("dashboard.superAdminPages.deleted"));
    } catch (error) {
      setDeleteId(null);
      showToast(
        getApiErrorMessage(error) ??
          t("dashboard.superAdminPages.deleteFailed"),
      );
    }
  }

  const isLoading = unitsQuery.isLoading || unitCategoriesQuery.isLoading;
  const error = unitsQuery.error ?? unitCategoriesQuery.error;

  return (
    <section className="w-full min-w-0 space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text">
          {t("dashboard.moduleNames.superAdmin.units")}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-text-muted">
          {t("dashboard.superAdminPages.unitsDescription")}
        </p>
      </header>
      <ModuleToolbar
        onSearch={setSearch}
        actionLabel={t("dashboard.superAdminPages.addUnit")}
        actionIcon={<Plus size={18} aria-hidden="true" />}
        onAction={openCreate}
        actionDisabled={isLoading || Boolean(error)}
      />
      <ApiStatus
        loading={isLoading}
        error={error}
        onRetry={() => {
          void Promise.all([
            unitsQuery.refetch(),
            unitCategoriesQuery.refetch(),
          ]);
        }}
      />
      {!isLoading && !error && (
        <UnitsTable
          units={filteredUnits}
          isNepali={isNepali}
          onEdit={(unit) => {
            setEditingUnit(unit);
            setFormOpen(true);
          }}
          onDelete={setDeleteId}
        />
      )}
      {formOpen && (
        <UnitFormDialog
          key={editingUnit?.id ?? "new"}
          unit={editingUnit}
          categories={unitCategories}
          onClose={() => setFormOpen(false)}
          onSave={saveUnit}
        />
      )}
      {deleteId !== null && (
        <DeleteDialog
          onCancel={() => setDeleteId(null)}
          onConfirm={() => void confirmDelete()}
        />
      )}
      <Toast message={message} />
    </section>
  );
}
