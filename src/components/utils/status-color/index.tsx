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
      return "#B22222";
    default:
      return "black";
  }
}
