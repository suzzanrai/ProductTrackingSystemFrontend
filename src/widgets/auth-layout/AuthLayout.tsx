import type { ReactNode } from "react";
import { Sprout } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@shared/ui";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-surface">
        <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-control bg-primary text-white">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-heading font-semibold leading-none tracking-tight text-text">
                {t("brand.name")}
              </span>
              <span className="mt-1 text-small leading-none text-text-muted">
                {t("header.tagline")}
              </span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-between px-4 py-8 md:px-6 md:py-12">
        <div className="flex w-full max-w-2xl flex-col gap-6 rounded-card border bg-surface p-5 md:gap-8 md:p-8">
          {children}
        </div>

        <footer className="mt-8 flex w-full max-w-2xl flex-col items-center justify-between gap-3 text-center text-small text-text-muted md:flex-row md:text-left">
          <span>{t("footer.copyright")}</span>
          <div className="flex items-center gap-4">
            <span>{t("footer.security")}</span>
            <span aria-hidden="true" className="text-border">
              •
            </span>
            <span>{t("footer.support")}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
