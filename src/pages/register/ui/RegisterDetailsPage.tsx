import { useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@features/registration/api/register";
import {
  createRegisterSchema,
  type RegistrationForm,
} from "@features/registration/model/registerSchema";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  ShieldCheck,
  Sprout,
  UserPlus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ROLES } from "@features/registration/model/roles";
import { useRegistrationStore } from "@shared/store";
import { cn } from "@shared/lib";
import { LanguageToggle } from "@shared/ui";

const inputClass =
  "h-control w-full rounded-control border bg-surface px-4 text-body text-text focus:border-primary";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function firstDetailMessage(
  details: unknown,
  key: string,
): string | undefined {
  if (!isRecord(details)) return undefined;

  const messages = details[key];
  return Array.isArray(messages) && typeof messages[0] === "string"
    ? messages[0]
    : undefined;
}

export function RegisterDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const roleId = useRegistrationStore((state) => state.role);
  const role = ROLES.find((item) => item.id === roleId);
  const validationSchema = useMemo(
    () =>
      createRegisterSchema({
        required: t("registrationDetails.required"),
        emailRule: t("registrationDetails.emailRule"),
        passwordMismatch: t("registrationDetails.passwordMismatch"),
      }),
    [t],
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null,
  );
  const [submissionError, setSubmissionError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      englishName: "",
      nepaliName: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegistrationForm) {
    setSubmissionMessage(null);
    setSubmissionError(false);
    setIsSubmitting(true);

    try {
      await registerUser({
        nameEn: values.englishName,
        nameNp: values.nepaliName,
        contact: values.contactNumber,
        email: values.email,
        password: values.password,
        role: roleId,
      });
      setSubmissionMessage(t("registrationDetails.registrationSuccess"));
    } catch (error) {
      const payload = isRecord(error) ? error : undefined;
      const apiError =
        payload && isRecord(payload.error) ? payload.error : undefined;
      const details = apiError?.details ?? payload?.details;
      const emailMessage = firstDetailMessage(details, "Email");
      const contactMessage = firstDetailMessage(details, "Contact");

      if (emailMessage) {
        setError("email", { type: "server", message: emailMessage });
      }
      if (contactMessage) {
        setError("contactNumber", {
          type: "server",
          message: contactMessage,
        });
      }

      const apiMessage =
        (typeof apiError?.message === "string" && apiError.message) ||
        (typeof payload?.message === "string" && payload.message);
      setSubmissionError(true);
      setSubmissionMessage(
        apiMessage ||
          (emailMessage || contactMessage
            ? null
            : t("registrationDetails.registrationFailed")),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const RoleIcon = role?.icon;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-surface">
        <div className="flex h-16 w-full items-center justify-between gap-2 px-2 md:gap-3 md:px-6 lg:px-12">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-primary text-white md:size-8">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="max-w-[110px] truncate text-[18px] font-semibold leading-none tracking-tight text-text md:max-w-none md:text-heading">
                {t("brand.name")}
              </span>
              <span className="mt-1 hidden text-small leading-none text-text-muted md:block">
                {t("header.tagline")}
              </span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="flex min-h-screen w-full flex-col justify-between bg-background pt-16">
        <div className="flex w-full flex-1 justify-center px-4 py-8 md:px-6 md:py-12">
          <div className="flex w-full max-w-[740px] flex-col gap-8">

            <section className="flex w-full flex-col gap-6 rounded-card border bg-surface p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 rounded-control border border-primary-light bg-primary-light p-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-primary text-white">
                    {RoleIcon && (
                      <RoleIcon className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="truncate text-body font-semibold text-text">
                    {t("registrationDetails.roleLabel")}{" "}
                    {role
                      ? t(`roleSelect.roles.${role.id.toLowerCase()}.title`)
                      : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/register/role" })}
                  className="shrink-0 rounded-control px-2 py-1 text-small font-medium text-primary hover:underline"
                >
                  {t("registrationDetails.editRole")}
                </button>
              </div>

              <header className="flex flex-col gap-1 border-b pb-5">
                <h1 className="text-heading font-semibold tracking-tight text-text md:text-title">
                  {t("registrationDetails.title")}
                </h1>
                <p className="text-small text-text-muted">
                  {t("registrationDetails.subtitle")}
                </p>
              </header>

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                onChange={() => {
                  setSubmissionMessage(null);
                  setSubmissionError(false);
                }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="registration-english-name"
                      className="text-small font-medium text-text"
                    >
                      {t("registrationDetails.englishName")}{" "}
                      <span className="text-danger" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="registration-english-name"
                      type="text"
                      autoComplete="name"
                      placeholder={t(
                        "registrationDetails.englishNamePlaceholder",
                      )}
                      aria-invalid={!!errors.englishName}
                      aria-describedby={
                        errors.englishName
                          ? "registration-english-name-error"
                          : undefined
                      }
                      className={inputClass}
                      {...register("englishName")}
                    />
                    {errors.englishName && (
                      <p
                        id="registration-english-name-error"
                        className="text-small text-danger-text"
                      >
                        {errors.englishName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="registration-nepali-name"
                      className="text-small font-medium text-text"
                    >
                      {t("registrationDetails.nepaliName")}{" "}
                      <span className="text-danger" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="registration-nepali-name"
                      type="text"
                      lang="ne"
                      autoComplete="name"
                      placeholder={t(
                        "registrationDetails.nepaliNamePlaceholder",
                      )}
                      aria-invalid={!!errors.nepaliName}
                      aria-describedby={
                        errors.nepaliName
                          ? "registration-nepali-name-error"
                          : undefined
                      }
                      className={inputClass}
                      {...register("nepaliName")}
                    />
                    {errors.nepaliName && (
                      <p
                        id="registration-nepali-name-error"
                        className="text-small text-danger-text"
                      >
                        {errors.nepaliName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="registration-contact-number"
                    className="text-small font-medium text-text"
                  >
                    {t("registrationDetails.contactNumber")}{" "}
                    <span className="text-danger" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="registration-contact-number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={t(
                      "registrationDetails.contactNumberPlaceholder",
                    )}
                    aria-invalid={!!errors.contactNumber}
                    aria-describedby={
                      errors.contactNumber
                        ? "registration-contact-number-error"
                        : undefined
                    }
                    className={inputClass}
                    {...register("contactNumber", {
                      onChange: () => clearErrors("contactNumber"),
                    })}
                  />
                  {errors.contactNumber && (
                    <p
                      id="registration-contact-number-error"
                      className="text-small text-danger-text"
                    >
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="registration-email"
                    className="text-small font-medium text-text"
                  >
                    {t("registrationDetails.email")}{" "}
                    <span className="text-danger" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="registration-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("registrationDetails.emailPlaceholder")}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "registration-email-error" : undefined
                    }
                    className={inputClass}
                    {...register("email", {
                      onChange: () => clearErrors("email"),
                    })}
                  />
                  {errors.email && (
                    <p
                      id="registration-email-error"
                      className="text-small text-danger-text"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="registration-password"
                      className="text-small font-medium text-text"
                    >
                      {t("registrationDetails.password")}{" "}
                      <span className="text-danger" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="registration-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                          errors.password
                            ? "registration-password-error"
                            : undefined
                        }
                        className={cn(inputClass, "pr-12")}
                        {...register("password", {
                          onChange: (event: ChangeEvent<HTMLInputElement>) => {
                            setPasswordValue(event.target.value);
                            if (getValues("confirmPassword")) {
                              void trigger("confirmPassword");
                            }
                          },
                        })}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword
                            ? t("login.hidePassword")
                            : t("login.showPassword")
                        }
                        onClick={() => setShowPassword((visible) => !visible)}
                        className="absolute right-0 top-0 flex h-control w-control items-center justify-center text-text-muted hover:text-text"
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" aria-hidden="true" />
                        ) : (
                          <Eye className="size-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p
                        id="registration-password-error"
                        className="text-small text-danger-text"
                      >
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="registration-confirm-password"
                      className="text-small font-medium text-text"
                    >
                      {t("registrationDetails.confirmPassword")}{" "}
                      <span className="text-danger" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="registration-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={
                          errors.confirmPassword
                            ? "registration-confirm-password-error"
                            : undefined
                        }
                        className={cn(inputClass, "pr-12")}
                        {...register("confirmPassword", {
                          onChange: (event: ChangeEvent<HTMLInputElement>) =>
                            setConfirmPasswordValue(event.target.value),
                        })}
                      />
                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? t("login.hidePassword")
                            : t("login.showPassword")
                        }
                        onClick={() =>
                          setShowConfirmPassword((visible) => !visible)
                        }
                        className="absolute right-0 top-0 flex h-control w-control items-center justify-center text-text-muted hover:text-text"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" aria-hidden="true" />
                        ) : (
                          <Eye className="size-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p
                        id="registration-confirm-password-error"
                        className="text-small text-danger-text"
                      >
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    {passwordValue.length > 0 &&
                      confirmPasswordValue === passwordValue && (
                        <p className="flex items-center gap-1.5 text-small text-success-text">
                          <Check className="size-4" aria-hidden="true" />
                          {t("registrationDetails.passwordsMatch")}
                        </p>
                      )}
                  </div>
                </div>

                {submissionMessage && (
                  <div
                    role={submissionError ? "alert" : "status"}
                    className={cn(
                      "flex items-start gap-2 rounded-control border p-3",
                      submissionError
                        ? "border-danger bg-danger-bg text-danger-text"
                        : "border-success bg-success-bg text-success-text",
                    )}
                  >
                    {submissionError ? (
                      <CircleAlert
                        className="mt-0.5 size-5 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Check
                        className="mt-0.5 size-5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <p className="text-small">{submissionMessage}</p>
                  </div>
                )}

                <div className="flex flex-col-reverse items-center justify-between gap-3 border-t pt-5 md:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/register/role" })}
                    className="inline-flex h-control w-full items-center justify-center gap-2 rounded-control border bg-surface px-6 text-body font-medium text-text hover:bg-background md:w-auto"
                  >
                    <ArrowLeft className="size-5" aria-hidden="true" />
                    {t("registrationDetails.back")}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-control w-full items-center justify-center gap-2 rounded-control bg-primary px-8 text-body font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                  >
                    {isSubmitting
                      ? t("registrationDetails.submitting")
                      : t("registrationDetails.submit")}
                    <UserPlus className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </section>

            <aside
              aria-label={t("registrationDetails.securityNoticeLabel")}
              className="flex w-full items-start gap-3.5 rounded-card border bg-background p-4 text-text-muted"
            >
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <span className="text-small font-semibold text-text">
                  {t("registrationDetails.securityTitle")}
                </span>
                <span className="text-small leading-relaxed">
                  {t("registrationDetails.securityNote")}
                </span>
              </div>
            </aside>

            <footer className="flex w-full flex-col items-center justify-between gap-4 border-t pt-6 pb-8 text-center text-small text-text-muted md:flex-row md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span>{t("registrationDetails.copyright")}</span>
                <span aria-hidden="true">•</span>
                <span>{t("registrationDetails.collaboration")}</span>
              </div>
              <div className="flex items-center gap-6">
                <a className="hover:text-text" href="#">
                  {t("registrationDetails.terms")}
                </a>
                <a className="hover:text-text" href="#">
                  {t("registrationDetails.privacy")}
                </a>
                <a className="hover:text-text" href="#">
                  {t("registrationDetails.support")}
                </a>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
