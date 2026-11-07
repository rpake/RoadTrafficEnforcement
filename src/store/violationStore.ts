import { create } from "zustand";
import type { Violation } from "@/types/violation";
import { listViolations, saveViolation } from "@/database/db";
interface State {
  violations: Violation[];
  loaded: boolean;
  load: () => Promise<void>;
  addViolation: (v: Violation) => Promise<void>;
}
export const useViolationStore = create<State>((set, get) => ({
  violations: [],
  loaded: false,
  load: async () => {
    const violations = await listViolations();
    set({ violations, loaded: true });
  },
  addViolation: async (v) => {
    await saveViolation(v);
    set({ violations: [v, ...get().violations.filter((x) => x.id !== v.id)] });
  },
}));
