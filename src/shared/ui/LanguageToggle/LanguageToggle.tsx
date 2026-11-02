import { cn } from "@shared/lib";
import { useUiStore, type Language } from "@shared/store";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ne", label: "नेपाली" },
];

export function LanguageToggle() {
  const language = useUiStore((s) => s.language);
  const setLanguage = useUiStore((s) => s.setLanguage);

  return (
    <div
      role="group"
      aria-label="भाषा / Language"
      className="inline-flex h-10 rounded-control border bg-background p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
          className={cn(
            "h-full rounded-[6px] px-2 text-[12px] font-medium md:px-3 md:text-small",
            language === option.value
              ? "bg-primary text-white"
              : "text-text-muted hover:text-text",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}