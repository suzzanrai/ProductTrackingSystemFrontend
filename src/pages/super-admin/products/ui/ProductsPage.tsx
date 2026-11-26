import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../../api/response";
import { useMaterialCategories } from "../../categories/api/categories";
import { ApiStatus } from "../../components/ApiStatus";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useCreateMaterial,
  useDeleteMaterial,
  useMaterials,
  useUpdateMaterial,
  type Material,
} from "../api/materials";
import { useUnits } from "../../unit/api/units";
import {
  ProductFormDialog,
  type ProductValues,
} from "../components/ProductFormDialog";
import { ProductsTable } from "../components/ProductsTable";

export function ProductsPage() {
  const { t, i18n } = useTranslation();
  const productsQuery = useMaterials();
  const categoriesQuery = useMaterialCategories();
  const unitsQuery = useUnits();
  const createProduct = useCreateMaterial();
  const updateProduct = useUpdateMaterial();
  const deleteProduct = useDeleteMaterial();
  const categories = categoriesQuery.data ?? [];
  const units = unitsQuery.data ?? [];
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Material | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (productsQuery.data ?? []).filter((product) =>
      [
        product.nameEn,
        product.nameNp,
        product.materialCategoryNameEn,
        product.materialCategoryNameNp,
        product.description ?? "",
      ].some((value) => value.toLocaleLowerCase().includes(query)),
    );
  }, [productsQuery.data, search]);

  function openCreate() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  async function saveProduct(values: ProductValues) {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, values });
      } else {
        await createProduct.mutateAsync(values);
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
      await deleteProduct.mutateAsync(deleteId);
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

  const isLoading =
    productsQuery.isLoading ||
    categoriesQuery.isLoading ||
    unitsQuery.isLoading;
  const error =
    productsQuery.error ?? categoriesQuery.error ?? unitsQuery.error;

  return (
    <section className="w-full min-w-0 space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[34px]">
          {t("dashboard.moduleNames.superAdmin.products")}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-text-muted">
          {t("dashboard.superAdminPages.productsDescription")}
        </p>
      </header>
      <ModuleToolbar
        onSearch={setSearch}
        actionLabel={t("dashboard.superAdminPages.addProduct")}
        actionIcon={<Plus size={18} aria-hidden="true" />}
        onAction={openCreate}
        actionDisabled={isLoading || Boolean(error)}
      />
      <ApiStatus
        loading={isLoading}
        error={error}
        onRetry={() => {
          void Promise.all([
            productsQuery.refetch(),
            categoriesQuery.refetch(),
            unitsQuery.refetch(),
          ]);
        }}
      />
      {!isLoading && !error && (
        <ProductsTable
          products={filteredProducts}
          isNepali={isNepali}
          onEdit={(product) => {
            setEditingProduct(product);
            setFormOpen(true);
          }}
          onDelete={setDeleteId}
        />
      )}
      {formOpen && (
        <ProductFormDialog
          key={editingProduct?.id ?? "new"}
          product={editingProduct}
          categories={categories}
          units={units}
          onClose={() => setFormOpen(false)}
          onSave={saveProduct}
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
