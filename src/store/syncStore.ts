import { create } from "zustand";
export const useSyncStore = create<{
  pending: number;
  setPending: (n: number) => void;
}>((set) => ({ pending: 0, setPending: (pending) => set({ pending }) }));
