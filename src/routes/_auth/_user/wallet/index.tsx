import { StepWelcome } from "@/components/organisms/earn-money-steps/step-welcome";
import { createFileRoute } from "@tanstack/react-router";

const TaskList = () => {
  return <StepWelcome />;
};

export const Route = createFileRoute("/_auth/_user/wallet/")({
  component: TaskList,
});
