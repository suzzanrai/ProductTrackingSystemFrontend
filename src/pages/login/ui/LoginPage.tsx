import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BadgeCheck,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  QrCode,
  Sprout,
  UserPlus,
} from "lucide-react";
import { cn } from "@shared/lib";
import { LanguageToggle } from "@shared/ui";

type LoginForm = {
  identifier: string;
  password: string;
  remember: boolean;
};

const pillars = [1, 2, 3] as const;

const inputBase =
  "h-control w-full rounded-control border bg-surface px-4 text-body text-text placeholder:text-text-muted focus:border-primary";

export function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { identifier: "", password: "", remember: false },
  });

  const onSubmit = () => {
    // TEMPORARY: no backend yet, so a valid form always shows the error box.
    // The real login call replaces this in the auth step.
    setAuthError(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-surface">
        <div className="flex h-16 items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-control bg-primary text-white">
              <Sprout size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-heading font-semibold">
                {t("brand.name")}
              </span>
              <span className="text-small text-text-muted">
                {t("header.tagline")}
              </span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Left panel: brand */}
        <section className="flex flex-col justify-between bg-primary p-8 text-white lg:border-r lg:p-16">
          <div>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-control bg-surface text-primary">
                <QrCode size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-title font-semibold">
                  {t("brand.name")}
                </span>
                <span className="text-small text-primary-light">
                  {t("brand.sub")}
                </span>
              </div>
            </div>

            <div className="mb-12 max-w-lg space-y-2">
              <h1 className="text-heading font-semibold">
                {t("brand.heroTitle")}
              </h1>
              <p className="text-body text-primary-light">
                {t("brand.heroDesc")}
              </p>
            </div>

            <div className="max-w-lg space-y-4">
              {pillars.map((n) => (
                <div
                  key={n}
                  className="flex items-start gap-4 rounded-control border border-white/30 bg-primary-dark p-4"
                >
                  <CircleCheck size={24} className="mt-0.5 shrink-0 text-accent" />
                  <div className="flex flex-col">
                    <span className="text-heading font-semibold">
                      {t(`brand.pillar${n}Title`)}
                    </span>
                    <span className="text-small text-primary-light">
                      {t(`brand.pillar${n}Desc`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 border-t border-white/20 pt-12 text-primary-light">
            <BadgeCheck size={18} />
            <span className="text-small">{t("brand.trustNote")}</span>
          </div>
        </section>

        {/* Right panel: login card */}
        <section className="flex flex-col justify-center p-8 text-text lg:border-r lg:p-7">
          <div className="flex-1 rounded-card border bg-surface p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-title font-semibold">
                {t("login.title")}
              </h2>
              <p className="text-small text-text-muted">
                {t("login.subtitle")}
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Identifier */}
              <div className="space-y-2">
                <label
                  htmlFor="identifier"
                  className="block text-small font-semibold"
                >
                  {t("login.identifierLabel")}
                </label>
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder={t("login.identifierPlaceholder")}
                  aria-invalid={!!errors.identifier}
                  className={cn(inputBase, errors.identifier && "border-danger")}
                  {...register("identifier", {
                    required: t("login.identifierRequired"),
                  })}
                />
                {errors.identifier && (
                  <p className="flex items-center gap-2 text-small text-danger-text">
                    <CircleAlert size={16} className="shrink-0" />
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-small font-semibold"
                >
                  {t("login.passwordLabel")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    aria-invalid={!!errors.password || authError}
                    className={cn(
                      inputBase,
                      "pr-12",
                      (errors.password || authError) && "border-danger",
                    )}
                    {...register("password", {
                      required: t("login.passwordRequired"),
                    })}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? t("login.hidePassword")
                        : t("login.showPassword")
                    }
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-0 flex h-control w-control items-center justify-center text-text-muted hover:text-text"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="flex items-center gap-2 text-small text-danger-text">
                    <CircleAlert size={16} className="shrink-0" />
                    {errors.password.message}
                  </p>
                )}

                {authError && (
                  <div
                    role="alert"
                    className="mt-2 flex items-start gap-2 rounded-control border border-danger bg-danger-bg p-3"
                  >
                    <CircleAlert
                      size={20}
                      className="mt-0.5 shrink-0 text-danger-text"
                    />
                    <span className="text-small font-semibold text-danger-text">
                      {t("login.errorInvalid")}
                    </span>
                  </div>
                )}
              </div>

              {/* Remember me and forgot password */}
              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-sm accent-primary"
                    {...register("remember")}
                  />
                  <span className="text-small text-text-muted">
                    {t("login.rememberMe")}
                  </span>
                </label>
                <button
                  type="button"
                  className="text-small text-primary hover:underline"
                >
                  {t("login.forgotPassword")}
                </button>
              </div>

              {/* Primary action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex h-control w-full items-center justify-center gap-2 rounded-control bg-primary px-6 text-body font-medium text-white hover:bg-primary-dark"
                >
                  <span>{t("login.submit")}</span>
                  <LogIn size={20} />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8 text-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface px-4 text-small text-text-muted">
                  {t("login.newHere")}
                </span>
              </div>
            </div>

            {/* Secondary action */}
            <Link
              to="/register"
              className="flex h-control w-full items-center justify-center gap-2 rounded-control border border-primary bg-surface px-6 text-body font-medium text-primary hover:bg-primary-light"
            >
              <span>{t("login.register")}</span>
              <UserPlus size={20} />
            </Link>

            {/* Compliance row */}
            <div className="mt-8 flex items-center justify-between gap-2 border-t pt-6 text-small text-text-muted">
              <div className="flex items-center gap-2">
                <Lock size={16} />
                <span>{t("login.securityBadge")}</span>
              </div>
              <span>{t("login.versionBadge")}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-surface py-4">
<div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 px-6 text-small text-text-muted lg:px-12">          <span>{t("footer.copyright")}</span>
          <div className="flex items-center gap-4">
            <span>{t("footer.security")}</span>
            <span>{t("footer.support")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}