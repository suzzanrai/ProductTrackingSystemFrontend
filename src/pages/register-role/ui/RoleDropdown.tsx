import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@shared/lib";
import { ROLES, type RoleId } from "../model/roles";
import { ApprovalBadge } from "./ApprovalBadge";

interface RoleDropdownProps {
  value: RoleId;
  onChange: (role: RoleId) => void;
}

export function RoleDropdown({ value, onChange }: RoleDropdownProps) {
  const { t } = useTranslation();
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const triggerId = `${baseId}-trigger`;
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = ROLES.findIndex((role) => role.id === value);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selected = ROLES[selectedIndex];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  function openMenu() {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function select(index: number) {
    const role = ROLES[index];
    if (!role) return;

    onChange(role.id);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((index) => Math.min(index + 1, ROLES.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(ROLES.length - 1);
        }
        break;
      case "Enter":
      case " ":
        if (open) {
          event.preventDefault();
          select(activeIndex);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  if (!selected) {
    return null;
  }

  const SelectedIcon = selected.icon;

  return (
    <div ref={rootRef} className="relative flex w-full flex-col gap-2">
      <label
        id={labelId}
        htmlFor={triggerId}
        className="text-small font-medium text-text"
      >
        {t("roleSelect.label")}
      </label>

      <button
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className="flex h-control w-full items-center justify-between gap-3 rounded-control border bg-surface px-4 text-left hover:border-text-muted"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control border bg-background text-primary">
            <SelectedIcon className="size-[18px]" aria-hidden="true" />
          </span>
          <span className="truncate text-body font-medium text-text">
            {t(`roleSelect.roles.${selected.id}.title`)}
          </span>
          {selected.needsApproval && (
            <ApprovalBadge className="hidden md:inline-flex" />
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-text-muted transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-[360px] divide-y divide-border overflow-y-auto rounded-card border bg-surface shadow-floating"
        >
          {ROLES.map((role, index) => {
            const Icon = role.icon;
            const isSelected = role.id === value;

            return (
              <div
                key={role.id}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 p-4",
                  index === activeIndex && "bg-background",
                )}
              >
                <span className="flex min-w-0 items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-control border bg-surface",
                      isSelected ? "text-primary" : "text-text",
                    )}
                  >
                    <Icon className="size-[22px]" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-body font-semibold text-text">
                        {t(`roleSelect.roles.${role.id}.title`)}
                      </span>
                      {role.needsApproval && <ApprovalBadge />}
                    </span>
                    <span className="text-small leading-snug text-text-muted">
                      {t(`roleSelect.roles.${role.id}.description`)}
                    </span>
                  </span>
                </span>
                <Check
                  className={cn(
                    "size-5 shrink-0 text-primary",
                    !isSelected && "opacity-0",
                  )}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
