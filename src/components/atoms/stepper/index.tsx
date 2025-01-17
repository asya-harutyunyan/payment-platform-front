import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import Box from "@mui/material/Box";
import ButtonMui from "@mui/material/Button";

import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ReactNode } from "@tanstack/react-router";
import * as React from "react";
import { FC } from "react";
import { BasicCard } from "../card";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
              onClick={handleStep(index)}
              aria-label={`Step ${index + 1}`}
            >
              <P
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                {step.label}
              </P>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <BasicCard sx={{ height: "300px" }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonMui onClick={handleReset}>Reset</ButtonMui>
            </Box>
          </BasicCard>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, py: 1 }}>
              {/* Render the dynamic component for the current step */}
              {steps[activeStep]?.component || (
                <Typography>No content for this step</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <ButtonMui
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </ButtonMui>
              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonMui onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </ButtonMui>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};
