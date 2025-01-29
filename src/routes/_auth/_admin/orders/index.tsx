import { createFileRoute } from "@tanstack/react-router";

const OrderList = () => {
  return <div />;
};

export const Route = createFileRoute("/_auth/_admin/orders/")({
  component: OrderList,
});
