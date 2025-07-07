import { OrdersHistoryPage } from "@/components/organisms/orders-history";
import { createFileRoute } from "@tanstack/react-router";

const Steps = () => {
  return <OrdersHistoryPage />;
};

export const Route = createFileRoute("/_auth/_user/orders-history/")({
  component: Steps,
});
