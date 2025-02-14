import { OrderInfoUser } from "@/components/organisms/order-info-user";
import { createFileRoute } from "@tanstack/react-router";

const UserDetail = () => {
  return <OrderInfoUser />;
};

export const Route = createFileRoute("/_auth/_user/orders/$id")({
  component: UserDetail,
});
