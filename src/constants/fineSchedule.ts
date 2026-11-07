export interface FineScheduleItem {
  id: string;
  code: string;
  violationType: string;
  description: string;
  amountPGK: number;
}
// DEMONSTRATION ONLY. Never use these amounts for legally enforceable notices.
export const FINE_SCHEDULE: FineScheduleItem[] = [
  {
    id: "speed",
    code: "DEMO-001",
    violationType: "Speeding",
    description: "Exceeding speed limit",
    amountPGK: 150,
  },
  {
    id: "licence",
    code: "DEMO-002",
    violationType: "Driving without licence",
    description: "Driver unable to present a valid licence",
    amountPGK: 300,
  },
  {
    id: "registration",
    code: "DEMO-003",
    violationType: "Unregistered vehicle",
    description: "Vehicle registration not current",
    amountPGK: 250,
  },
  {
    id: "danger",
    code: "DEMO-004",
    violationType: "Dangerous driving",
    description: "Unsafe or dangerous driving",
    amountPGK: 500,
  },
  {
    id: "seatbelt",
    code: "DEMO-005",
    violationType: "Seatbelt offence",
    description: "Seatbelt not worn",
    amountPGK: 100,
  },
  {
    id: "phone",
    code: "DEMO-006",
    violationType: "Mobile phone use",
    description: "Phone used while driving",
    amountPGK: 150,
  },
  {
    id: "dui",
    code: "DEMO-007",
    violationType: "Driving under the influence",
    description: "Suspected impairment; may require court process",
    amountPGK: 1000,
  },
  {
    id: "signal",
    code: "DEMO-008",
    violationType: "Disobeying traffic signal",
    description: "Failed to comply with traffic signal",
    amountPGK: 200,
  },
  {
    id: "defective",
    code: "DEMO-009",
    violationType: "Defective vehicle",
    description: "Vehicle not roadworthy",
    amountPGK: 200,
  },
  {
    id: "parking",
    code: "DEMO-010",
    violationType: "Illegal parking",
    description: "Parking violation",
    amountPGK: 100,
  },
];
