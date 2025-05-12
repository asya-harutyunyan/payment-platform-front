export function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "rgb(216, 151, 29)";
    case "canceled":
      return "#bd591f";
    case "in_progress":
      return "#1e68b2";
    case "done":
      return "#008000";
    case "expired":
      return "#B22222";
    case "failed":
      return "#4a4a4a";
    default:
      return "black";
  }
}

export const StatusOptions = [
  { id: Math.random(), name: "pending" },
  { id: Math.random(), name: "canceled" },
  { id: Math.random(), name: "in_progress" },
  { id: Math.random(), name: "done" },
  { id: Math.random(), name: "expired" },
  { id: Math.random(), name: "failed" },
  { id: Math.random(), name: "all" },
];

export const CurrencyOptions = [
  { id: Math.random(), name: "RUB" },
  { id: Math.random(), name: "USD" },
  { id: Math.random(), name: "USDT" },
  { id: Math.random(), name: "all" },
];
