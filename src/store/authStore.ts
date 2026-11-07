import { create } from "zustand";
import type { Officer } from "@/types/auth";
interface State {
  officer: Officer | null;
  signIn: (o: Officer) => void;
  signOut: () => void;
}
export const useAuthStore = create<State>((set) => ({
  officer: null,
  signIn: (officer) => set({ officer }),
  signOut: () => set({ officer: null }),
}));
