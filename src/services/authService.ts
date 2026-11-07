import type { Officer } from "@/types/auth";
// Offline demonstration login only: NOT authentication or authorization.
export async function demoLogin(
  badge: string,
  password: string,
): Promise<Officer> {
  if (!badge.trim() || !password.trim())
    throw new Error("Enter badge and password.");
  return {
    id: badge.trim(),
    badgeNumber: badge.trim(),
    name: "Demo Officer",
    role: "officer",
  };
}
