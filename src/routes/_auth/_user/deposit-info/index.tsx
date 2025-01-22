import { TaskListComponent } from "@/components/organisms/task-list";
import { createFileRoute } from "@tanstack/react-router";

const DepositInfo = () => {
  return <TaskListComponent />;
};

export const Route = createFileRoute("/_auth/_user/deposit-info/")({
  component: DepositInfo,
});
