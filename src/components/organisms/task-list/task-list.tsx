import { HorizontalNonLinearStepper } from "@/components/atoms/stepper";
import { StepOne } from "@/components/molecules/earn-money-steps/first-step";
import { StepTwo } from "@/components/molecules/earn-money-steps/second-step";
import { Success } from "@/components/molecules/earn-money-steps/success";
import { StepThree } from "@/components/molecules/earn-money-steps/third-step";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useState } from "react";

export const TaskListComponent: FC = () => {
  const [next, setNext] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const steps = [
    { label: "earn_money", component: <StepOne setNext={setNext} /> },
    { label: "it_will_be", component: <StepTwo setNext={setNext} /> },
    {
      label: "success",
      component: <StepThree setNext={setNext} setReset={setReset} />,
    },
    { label: "success", component: <Success setReset={setReset} /> },
  ];

  return (
    <Box>
      <TaskHeader title={t("task_list")} subTitle={"Lorem ipsum"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { lg: "0", md: "0", sx: "0", xs: "0" },
        }}
      >
        <HorizontalNonLinearStepper
          steps={steps}
          next={next}
          reset={reset}
          setNext={setNext}
        />
      </Box>
    </Box>
  );
};
