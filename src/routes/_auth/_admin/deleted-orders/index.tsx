import { DeletedOrdersComponent } from "@/components/organisms/deleted-orders/deleted-orders";
import { createFileRoute } from "@tanstack/react-router";

const DeletedOrders = () => {
  return <DeletedOrdersComponent />;
};

export const Route = createFileRoute("/_auth/_admin/deleted-orders/")({
  component: DeletedOrders,
});
