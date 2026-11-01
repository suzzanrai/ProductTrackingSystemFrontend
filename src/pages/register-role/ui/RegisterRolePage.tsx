import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "@widgets/auth-layout";
import { RegistrationStepper } from "@widgets/registration-stepper";
import { DEFAULT_ROLE, type RoleId } from "../model/roles";
import { RoleDropdown } from "./RoleDropdown";
import { RolePreviewCard } from "./RolePreviewCard";

export function RegisterRolePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleId>(DEFAULT_ROLE);

  return (
    <AuthLayout>
      <RegistrationStepper current={2} />

      <header className="flex flex-col gap-1 border-t pt-6">
        <h1 className="text-heading font-semibold text-text md:text-title">
          {t("roleSelect.title")}
        </h1>
        <p className="text-body text-text-muted">
          {t("roleSelect.subtitle")}
        </p>
      </header>

      <section className="flex w-full flex-col gap-5">
        <RoleDropdown value={role} onChange={setRole} />
        <RolePreviewCard roleId={role} />
      </section>

      <footer className="flex items-center justify-between gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/login" })}
          className="inline-flex h-control items-center gap-2 rounded-control border bg-surface px-6 text-body font-medium text-text hover:bg-background"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          {t("common.back")}
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/register/details" })}
          className="inline-flex h-control items-center gap-2 rounded-control bg-primary px-6 text-body font-medium text-white hover:bg-primary-dark"
        >
          {t("common.next")}
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </footer>
    </AuthLayout>
  );
}