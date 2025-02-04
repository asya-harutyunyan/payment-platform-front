import { TaskListComponent } from "@/components/organisms/wallet-stepts";
import { createFileRoute } from "@tanstack/react-router";

const Steps = () => {
  return <TaskListComponent />;
};

export const Route = createFileRoute("/_auth/_user/steps/")({
  component: Steps,
});
