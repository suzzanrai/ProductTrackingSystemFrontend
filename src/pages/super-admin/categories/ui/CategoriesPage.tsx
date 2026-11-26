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
  useCreateMaterialCategory,
  useDeleteMaterialCategory,
  useMaterialCategories,
  useUpdateMaterialCategory,
  type MaterialCategory,
} from "../api/categories";
import {
  CategoryFormDialog,
  type CategoryValues,
} from "../components/CategoryFormDialog";
import { CategoriesTable } from "../components/CategoriesTable";

export function CategoriesPage() {
  const { t } = useTranslation();
  const categoriesQuery = useMaterialCategories();
  const createCategory = useCreateMaterialCategory();
  const updateCategory = useUpdateMaterialCategory();
  const deleteCategory = useDeleteMaterialCategory();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<MaterialCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { message, showToast } = useSuperAdminToast();

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (categoriesQuery.data ?? []).filter((category) =>
      `${category.nameEn} ${category.nameNp} ${category.code}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [categoriesQuery.data, search]);

  function openCreate() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  async function saveCategory(values: CategoryValues) {
    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          values: {
            ...values,
          },
        });
      } else {
        await createCategory.mutateAsync(values);
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
      await deleteCategory.mutateAsync(deleteId);
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

  return (
    <section className="w-full min-w-0 space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[34px]">
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
        actionDisabled={categoriesQuery.isLoading || Boolean(categoriesQuery.error)}
      />
      <ApiStatus
        loading={categoriesQuery.isLoading}
        error={categoriesQuery.error}
        onRetry={() => void categoriesQuery.refetch()}
      />
      {!categoriesQuery.isLoading && !categoriesQuery.error && (
        <CategoriesTable
          categories={filteredCategories}
          onEdit={(category) => {
            setEditingCategory(category);
            setFormOpen(true);
          }}
          onDelete={setDeleteId}
        />
      )}
      {formOpen && (
        <CategoryFormDialog
          key={editingCategory?.id ?? "new"}
          category={editingCategory}
          categories={categoriesQuery.data ?? []}
          onClose={() => setFormOpen(false)}
          onSave={saveCategory}
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
