export interface Payment {
  id: string;
  ticketId: string;
  amountPGK: number;
  status: "unpaid" | "paid" | "disputed";
}
