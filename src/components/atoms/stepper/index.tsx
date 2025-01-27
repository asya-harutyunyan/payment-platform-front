import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import Box from "@mui/material/Box";
import ButtonMui from "@mui/material/Button";

import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ReactNode } from "@tanstack/react-router";
import { t } from "i18next";
import * as React from "react";
import { FC } from "react";
import { BasicCard } from "../card";
import { useStepper } from "./_services/useStepper";

type Steps = {
  label: string;
  component: ReactNode;
};
interface IHorizontalNonLinearStepper {
  steps: Steps[];
}

export const HorizontalNonLinearStepper: FC<IHorizontalNonLinearStepper> = ({
  steps,
}) => {
  const {
    activeStep,
    completed,
    //do not delete
    // handleStep,
    handleReset,
    handleNext,
    handleBack,
    setActiveStep,
  } = useStepper(steps.length);

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            key={step.label}
            completed={completed[index]}
            sx={{ color: theme.palette.primary.main }}
          >
            <StepButton
              color="inherit"
              // onClick={() => handleStep(index)}
              aria-label={`Step ${index + 1}`}
            >
              <P
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                {t(step.label)}
              </P>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <BasicCard sx={{ height: "300px" }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {t("complated_steps")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonMui onClick={handleReset}>Reset</ButtonMui>
            </Box>
          </BasicCard>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, py: 1 }}>
              {steps[activeStep]?.component({
                handleNext,
                handleReset,
                handleBack,
                setActiveStep,
              }) || <Typography>{t("no_content")}</Typography>}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};
