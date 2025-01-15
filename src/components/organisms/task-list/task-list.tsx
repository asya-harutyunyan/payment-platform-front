import { HorizontalNonLinearStepper } from "@/components/atoms/stepper";
import { StepOne } from "@/components/molecules/earn-money-steps/first-step";
import { StepTwo } from "@/components/molecules/earn-money-steps/second-step";
import { StepThree } from "@/components/molecules/earn-money-steps/third-step";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { FC } from "react";

const steps = [
  { label: "Earn money.", component: <StepOne /> },
  { label: "How much will it be?", component: <StepTwo /> },
  { label: "Success!", component: <StepThree /> },
];

export const TaskListComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={"Task List"} subTitle={"Lorem ipsum"} />
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "0 50px" }}
      >
        <HorizontalNonLinearStepper steps={steps} />
      </Box>
    </Box>
  );
};
