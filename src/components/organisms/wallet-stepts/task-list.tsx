import { HorizontalNonLinearStepper } from "@/components/atoms/stepper";
import { StepOne } from "@/components/organisms/earn-money-steps/first-step";
import { StepTwo } from "@/components/organisms/earn-money-steps/second-step";
import { Success } from "@/components/organisms/earn-money-steps/success";
import { StepThree } from "@/components/organisms/earn-money-steps/third-step";
import { useAuth } from "@/context/auth.context";
import { Box } from "@mui/material";
import { FC } from "react";

export const TaskListComponent: FC = () => {
  const { user } = useAuth();
  const steps = [
    {
      label: "earn_money",
      component: (props: () => void) => <StepOne {...props} />,
    },
    {
      label: "cards",
      component: (props: () => void) => (
        <StepTwo
          {...props}
          cards={user?.bank_details.filter((card) => !card.is_blocked)}
        />
      ),
    },
    {
      label: "payment_variant",
      component: (props: () => void) => <StepThree {...props} />,
    },
    {
      label: "successed",
      component: (props: () => void) => <Success {...props} />,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { lg: "0", md: "0", sx: "0", xs: "0" },
          overflow: "hidden",
        }}
      >
        <HorizontalNonLinearStepper steps={steps} />
      </Box>
    </Box>
  );
};
