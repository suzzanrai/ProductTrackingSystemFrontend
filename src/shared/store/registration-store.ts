import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_ROLE, type RoleId } from "@features/registration/model/roles";

interface RegistrationState {
  role: RoleId;
  setRole: (role: RoleId) => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      role: DEFAULT_ROLE,
      setRole: (role) => set({ role }),
    }),
    {
      name: "pts-registration",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ role: state.role }),
    },
  ),
);
