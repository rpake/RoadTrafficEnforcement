export const normalizePlate = (s: string) => s.trim().toUpperCase();
export const isValidPlate = (s: string) =>
  /^[A-Z0-9 -]{3,12}$/.test(normalizePlate(s));
export const required = (s: string) => s.trim().length > 0;
