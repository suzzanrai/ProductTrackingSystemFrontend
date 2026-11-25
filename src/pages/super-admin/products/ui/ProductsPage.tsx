import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useSuperAdminMockData,
  type MockProduct,
} from "../../model/mock-data";
import {
  ProductFormDialog,
  type ProductValues,
} from "../components/ProductFormDialog";
import { ProductsTable } from "../components/ProductsTable";

export function ProductsPage() {
  const { t, i18n } = useTranslation();
  const products = useSuperAdminMockData((state) => state.products);
  const categories = useSuperAdminMockData((state) => state.categories);
  const units = useSuperAdminMockData((state) => state.units);
  const setProducts = useSuperAdminMockData((state) => state.setProducts);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MockProduct | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const category =
        categories.find((item) => item.id === product.categoryId)?.nameEn ?? "";
      return [
        product.nameEn,
        product.nameNp,
        category,
        product.descEn,
        product.descNp,
      ].some((value) => value.toLocaleLowerCase().includes(query));
    });
  }, [categories, products, search]);

  function openCreate() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openEdit(product: MockProduct) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function saveProduct(values: ProductValues) {
    const nextProduct: MockProduct = {
      ...values,
      id: editingProduct?.id ?? Date.now(),
      usedCount: editingProduct?.usedCount ?? 0,
    };
    setProducts((current) =>
      editingProduct
        ? current.map((item) =>
            item.id === editingProduct.id ? nextProduct : item,
          )
        : [nextProduct, ...current],
    );
    setFormOpen(false);
    showToast(t("dashboard.superAdminPages.saved"));
  }

  function confirmDelete() {
    if (deleteId === null) return;
    setProducts((current) => current.filter((item) => item.id !== deleteId));
    setDeleteId(null);
    showToast(t("dashboard.superAdminPages.deleted"));
  }

  return (
    <section className="space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[30px]">
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
      />
      <ProductsTable
        products={filteredProducts}
        categories={categories}
        units={units}
        isNepali={isNepali}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />
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
          onConfirm={confirmDelete}
        />
      )}
      <Toast message={message} />
    </section>
  );
}
