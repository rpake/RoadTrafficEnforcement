export async function verifyPayment(_reference: string): Promise<never> {
  throw new Error("Payment verification is not connected.");
}
