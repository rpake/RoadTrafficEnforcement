import { create } from "zustand";
export const useFineStore = create<{
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}>((set) => ({
  selectedIds: [],
  setSelectedIds: (selectedIds) => set({ selectedIds }),
}));
