import { Fragment } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@shared/lib";

const STEPS = ["account", "role", "verification"] as const;

interface RegistrationStepperProps {
  current: 1 | 2 | 3;
}

export function RegistrationStepper({ current }: RegistrationStepperProps) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("registration.progress")} className="w-full">
      <ol className="flex w-full items-center">
        {STEPS.map((step, index) => {
          const number = index + 1;
          const isDone = number < current;
          const isActive = number === current;

          return (
            <Fragment key={step}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className={cn(
                    "mx-2 flex-1 md:mx-4",
                    number <= current
                      ? "h-0.5 bg-primary-dark"
                      : "h-px bg-border",
                  )}
                />
              )}
              <li
                aria-current={isActive ? "step" : undefined}
                className="flex shrink-0 items-center gap-2 md:gap-3"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-small",
                    isDone && "bg-primary-dark text-white",
                    isActive && "bg-primary font-semibold text-white",
                    !isDone && !isActive && "border bg-surface text-text-muted",
                  )}
                >
                  {isDone ? (
                    <Check className="size-[18px]" aria-hidden="true" />
                  ) : (
                    number
                  )}
                </span>
                <span
                  className={cn(
                    "text-small",
                    isDone && "font-medium text-text",
                    isActive && "font-semibold text-primary",
                    !isDone && !isActive && "hidden text-text-muted md:inline",
                  )}
                >
                  {t(`registration.steps.${step}`)}
                </span>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
