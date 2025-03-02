export function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "#d8971d";
    case "canceled":
      return "#bd591f";
    case "in_progress":
      return "#1e68b2";
    case "done":
      return "#008000";
    case "expired":
      return "#ac9999";
    case "failed":
      return "#B22222";
    default:
      return "black";
  }
}
