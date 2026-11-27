import { useTranslation } from "react-i18next";
import { ApiStatus } from "../../components/ApiStatus";
import { DataTable } from "../../components/DataTable";
import { useUnitCategories } from "../api/units";

export function UnitCategoriesPage() {
  const { t, i18n } = useTranslation();
  const query = useUnitCategories();
  const isNepali = i18n.language.startsWith("ne");
  return <section className="w-full min-w-0 space-y-6 md:space-y-7">
    <header className="space-y-1.5"><h1 className="text-2xl font-bold leading-tight text-text">{t("dashboard.moduleNames.superAdmin.unitCategories")}</h1><p className="max-w-2xl text-sm leading-6 text-text-muted">{t("dashboard.superAdminPages.unitCategoriesDescription")}</p></header>
    <ApiStatus loading={query.isLoading} error={query.error} onRetry={() => void query.refetch()} />
    {!query.isLoading && !query.error && <DataTable headers={[t("dashboard.superAdminPages.nameEn"), t("dashboard.superAdminPages.nameNp"), t("dashboard.superAdminPages.description"), t("dashboard.superAdminPages.createdAt")]} empty={!query.data?.length} emptyLabel={t("dashboard.superAdminPages.nothingFound")} recordLabel={t("dashboard.superAdminPages.recordCount", { count: query.data?.length ?? 0 })} minWidth={760}>
      {(query.data ?? []).map((category) => <tr key={category.id} className="h-16 transition-colors hover:bg-background/80"><td className="px-5 py-3 font-semibold">{isNepali ? category.nameNp : category.nameEn}</td><td className="px-5 py-3">{isNepali ? category.nameEn : category.nameNp}</td><td className="px-5 py-3 text-text-muted">{category.description || "—"}</td><td className="px-5 py-3 text-sm text-text-muted">{category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "—"}</td></tr>)}
    </DataTable>}
  </section>;
}
