import { OrdersForRefoundPage } from "@/components/organisms/orders-for-refound";
import { createFileRoute } from "@tanstack/react-router";

const OrdersForRefound = () => {
  return <OrdersForRefoundPage />;
};

export const Route = createFileRoute("/_auth/_admin/orders-for-refound/")({
  component: OrdersForRefound,
});
