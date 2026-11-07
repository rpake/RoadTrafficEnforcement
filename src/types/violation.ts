export type ViolationStatus = "draft" | "submitted";
export interface Violation {
  id: string;
  plate: string;
  driverName: string;
  licenceNumber: string;
  fineIds: string[];
  totalPGK: number;
  location: string;
  notes: string;
  createdAt: string;
  officerId: string;
  evidenceUri?: string;
  latitude?: number;
  longitude?: number;
  status: ViolationStatus;
  paymentStatus: "unpaid" | "paid" | "disputed";
}
