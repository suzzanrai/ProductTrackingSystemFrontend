import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useSuperAdminMockData,
  type MockUnit,
} from "../../model/mock-data";
import { UnitFormDialog, type UnitValues } from "../components/UnitFormDialog";
import { UnitsTable } from "../components/UnitsTable";

export function UnitsPage() {
  const { t, i18n } = useTranslation();
  const units = useSuperAdminMockData((state) => state.units);
  const products = useSuperAdminMockData((state) => state.products);
  const setUnits = useSuperAdminMockData((state) => state.setUnits);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<MockUnit | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");

  const filteredUnits = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return units.filter((unit) =>
      `${unit.nameEn} ${unit.nameNp} ${unit.shortEn} ${unit.shortNp}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [search, units]);

  function openCreate() {
    setEditingUnit(null);
    setFormOpen(true);
  }

  function saveUnit(values: UnitValues) {
    const nextUnit: MockUnit = {
      ...values,
      id: editingUnit?.id ?? Date.now(),
    };
    setUnits((current) =>
      editingUnit
        ? current.map((item) =>
            item.id === editingUnit.id ? nextUnit : item,
          )
        : [nextUnit, ...current],
    );
    setFormOpen(false);
    showToast(t("dashboard.superAdminPages.saved"));
  }

  function confirmDelete() {
    if (deleteId === null) return;
    const unit = units.find((item) => item.id === deleteId);
    if (unit && products.some((product) => product.units.includes(unit.shortEn))) {
      showToast(t("dashboard.superAdminPages.unitInUse"));
      setDeleteId(null);
      return;
    }
    setUnits((current) => current.filter((item) => item.id !== deleteId));
    setDeleteId(null);
    showToast(t("dashboard.superAdminPages.deleted"));
  }

  return (
    <section className="space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[30px]">
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
      />
      <UnitsTable
        units={filteredUnits}
        isNepali={isNepali}
        onEdit={(unit) => {
          setEditingUnit(unit);
          setFormOpen(true);
        }}
        onDelete={setDeleteId}
      />
      {formOpen && (
        <UnitFormDialog
          key={editingUnit?.id ?? "new"}
          unit={editingUnit}
          onClose={() => setFormOpen(false)}
          onSave={saveUnit}
        />
      )}
      {deleteId !== null && (
        <DeleteDialog
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
      <Toast message={message} />
    </section>
  );
}
