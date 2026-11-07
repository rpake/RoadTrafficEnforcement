import type { Violation } from "@/types/violation";
export async function submitViolation(_item: Violation): Promise<never> {
  throw new Error(
    "Official submission requires a secured, authorized server. Record remains local.",
  );
}
