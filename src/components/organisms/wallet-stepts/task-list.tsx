import { HorizontalNonLinearStepper } from "@/components/atoms/stepper";
import TaskHeader from "@/components/molecules/title";
import { StepOne } from "@/components/organisms/earn-money-steps/first-step";
import { StepTwo } from "@/components/organisms/earn-money-steps/second-step";
import { Success } from "@/components/organisms/earn-money-steps/success";
import { StepThree } from "@/components/organisms/earn-money-steps/third-step";
import { useAuth } from "@/context/auth.context";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

export const TaskListComponent: FC = () => {
  const { user } = useAuth();
  const steps = [
    {
      label: "earn_money",
      component: (props: () => void) => <StepOne {...props} />,
    },
    {
      label: "add_card",
      component: (props: () => void) => (
        <StepTwo
          {...props}
          cards={user?.bank_details.filter((card) => !card.is_blocked)}
        />
      ),
    },
    {
      label: "it_will_be",
      component: (props: () => void) => <StepThree {...props} />,
    },
    {
      label: "success",
      component: (props: () => void) => <Success {...props} />,
    },
  ];

  return (
    <Box>
      <TaskHeader title={t("task_list")} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { lg: "0", md: "0", sx: "0", xs: "0" },
        }}
      >
        <HorizontalNonLinearStepper steps={steps} />
      </Box>
    </Box>
  );
};
