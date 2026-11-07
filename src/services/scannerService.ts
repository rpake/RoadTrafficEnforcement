export function normalizeScannedCode(value: string) {
  return value.trim();
}
// Scanned data is untrusted until verified against an authorized registry.
