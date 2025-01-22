import { HorizontalNonLinearStepper } from "@/components/atoms/stepper";
import { StepOne } from "@/components/molecules/earn-money-steps/first-step";
import { StepTwo } from "@/components/molecules/earn-money-steps/second-step";
import { Success } from "@/components/molecules/earn-money-steps/success";
import { StepThree } from "@/components/molecules/earn-money-steps/third-step";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

const steps = [
  { label: "earn_money", component: <StepOne /> },
  { label: "it_will_be", component: <StepTwo /> },
  { label: "success", component: <StepThree /> },
  { label: "success", component: <Success /> },
];

export const TaskListComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={t("task_list")} subTitle={"Lorem ipsum"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { lg: "0 50px", md: "0 50px", sx: "0", xs: "0" },
        }}
      >
        <HorizontalNonLinearStepper steps={steps} />
      </Box>
    </Box>
  );
};
