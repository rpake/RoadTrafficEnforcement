export async function syncRecords(): Promise<never> {
  throw new Error(
    "Synchronization requires an authorized backend. Local records remain on device.",
  );
}
