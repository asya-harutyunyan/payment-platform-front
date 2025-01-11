import { OrderListComponent } from "@/components/organisms/order-list";
import { createFileRoute } from "@tanstack/react-router";

const OrderList = () => {
  return <OrderListComponent />;
};

export const Route = createFileRoute("/_dashboard/order-list/")({
  component: OrderList,
});
