import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../api/response";

interface ApiStatusProps {
  loading: boolean;
  error?: unknown;
  onRetry: () => void;
}

export function ApiStatus({ loading, error, onRetry }: ApiStatusProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <p role="status" className="text-sm text-text-muted">
        {t("dashboard.superAdminPages.loading")}
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert" className="space-y-3 rounded-control border border-danger/30 p-4">
        <p className="text-sm text-danger">
          {getApiErrorMessage(error) ??
            t("dashboard.superAdminPages.requestFailed")}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {t("dashboard.superAdminPages.retry")}
        </button>
      </div>
    );
  }

  return null;
}
