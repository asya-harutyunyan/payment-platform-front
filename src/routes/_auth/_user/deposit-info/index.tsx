import { TaskListComponent } from "@/components/organisms/wallet-stepts";
import { createFileRoute } from "@tanstack/react-router";

const DepositInfo = () => {
  return <TaskListComponent />;
};

export const Route = createFileRoute("/_auth/_user/deposit-info/")({
  component: DepositInfo,
});
