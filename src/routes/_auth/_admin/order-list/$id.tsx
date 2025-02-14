import { OrderInfo } from "@/components/organisms/order-info";
import { createFileRoute } from "@tanstack/react-router";

const UserDetail = () => {
  return <OrderInfo />;
};

export const Route = createFileRoute("/_auth/_admin/order-list/$id")({
  component: UserDetail,
});
