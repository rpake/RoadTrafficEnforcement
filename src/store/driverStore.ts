import { create } from "zustand";
import type { Driver } from "@/types/driver";
export const useDriverStore = create<{
  current: Driver | null;
  setCurrent: (value: Driver | null) => void;
}>((set) => ({ current: null, setCurrent: (current) => set({ current }) }));
