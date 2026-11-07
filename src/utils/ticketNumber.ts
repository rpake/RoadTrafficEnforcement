export const makeTicketNumber = () =>
  `DEMO-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
