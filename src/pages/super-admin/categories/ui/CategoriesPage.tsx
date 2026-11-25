import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useSuperAdminMockData,
  type MockCategory,
} from "../../model/mock-data";
import {
  CategoryFormDialog,
  type CategoryValues,
} from "../components/CategoryFormDialog";
import { CategoriesTable } from "../components/CategoriesTable";

export function CategoriesPage() {
  const { t } = useTranslation();
  const categories = useSuperAdminMockData((state) => state.categories);
  const products = useSuperAdminMockData((state) => state.products);
  const setCategories = useSuperAdminMockData((state) => state.setCategories);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MockCategory | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { message, showToast } = useSuperAdminToast();

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return categories.filter((category) =>
      `${category.nameEn} ${category.nameNp}`.toLocaleLowerCase().includes(query),
    );
  }, [categories, search]);

  function openCreate() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function saveCategory(values: CategoryValues) {
    const nextCategory: MockCategory = {
      ...values,
      id: editingCategory?.id ?? Date.now(),
    };
    setCategories((current) =>
      editingCategory
        ? current.map((item) =>
            item.id === editingCategory.id ? nextCategory : item,
          )
        : [nextCategory, ...current],
    );
    setFormOpen(false);
    showToast(t("dashboard.superAdminPages.saved"));
  }

  function confirmDelete() {
    if (deleteId === null) return;
    if (products.some((product) => product.categoryId === deleteId)) {
      showToast(t("dashboard.superAdminPages.categoryInUse"));
      setDeleteId(null);
      return;
    }
    setCategories((current) =>
      current.filter((category) => category.id !== deleteId),
    );
    setDeleteId(null);
    showToast(t("dashboard.superAdminPages.deleted"));
  }

  return (
    <section className="space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[30px]">
          {t("dashboard.moduleNames.superAdmin.categories")}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-text-muted">
          {t("dashboard.superAdminPages.categoriesDescription")}
        </p>
      </header>
      <ModuleToolbar
        onSearch={setSearch}
        actionLabel={t("dashboard.superAdminPages.addCategory")}
        actionIcon={<Plus size={18} aria-hidden="true" />}
        onAction={openCreate}
      />
      <CategoriesTable
        categories={filteredCategories}
        onEdit={(category) => {
          setEditingCategory(category);
          setFormOpen(true);
        }}
        onDelete={setDeleteId}
      />
      {formOpen && (
        <CategoryFormDialog
          key={editingCategory?.id ?? "new"}
          category={editingCategory}
          onClose={() => setFormOpen(false)}
          onSave={saveCategory}
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
