import { create } from "zustand";
import type { Vehicle } from "@/types/vehicle";
export const useVehicleStore = create<{
  current: Vehicle | null;
  setCurrent: (value: Vehicle | null) => void;
}>((set) => ({ current: null, setCurrent: (current) => set({ current }) }));
