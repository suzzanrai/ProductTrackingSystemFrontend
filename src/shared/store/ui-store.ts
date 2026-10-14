import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "ne";

interface UiState {
  language: Language;
  sidebarOpen: boolean;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      language: "en",
      sidebarOpen: true,
      setLanguage: (language) => set({ language }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    { name: "pts-ui" }, // saved in the browser, so it survives a refresh
  ),
);