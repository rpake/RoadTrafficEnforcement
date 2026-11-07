import { FINE_SCHEDULE } from "@/constants/fineSchedule";
export const getFines = async () => FINE_SCHEDULE;
export const getFine = async (id: string) =>
  FINE_SCHEDULE.find((f) => f.id === id) ?? null;
export function calculateFine(ids: string[]) {
  const unique = [...new Set(ids)];
  if (unique.some((id) => !FINE_SCHEDULE.some((f) => f.id === id)))
    throw new Error("Unknown offence code");
  return {
    fineIds: unique,
    totalAmount: unique.reduce(
      (sum, id) => sum + FINE_SCHEDULE.find((f) => f.id === id)!.amountPGK,
      0,
    ),
  };
}
