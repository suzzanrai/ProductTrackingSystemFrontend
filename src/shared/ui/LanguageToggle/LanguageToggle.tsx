import { cn } from "@shared/lib";
import { useUiStore, type Language } from "@shared/store";

const options: { value: Language; label: string }[] = [
  { value: "ne", label: "नेपाली" },
  { value: "en", label: "English" },
];

export function LanguageToggle() {
  const language = useUiStore((s) => s.language);
  const setLanguage = useUiStore((s) => s.setLanguage);

  return (
    <div
      role="group"
      aria-label="भाषा / Language"
      className="inline-flex overflow-hidden rounded-control border"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
          className={cn(
            "h-control px-4 text-body font-medium",
            language === option.value
              ? "bg-primary-light text-primary"
              : "bg-surface text-text-muted hover:bg-background",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}