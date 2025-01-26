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
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { BasicCard } from "../card";
import { useStepper } from "./_services/useStepper";

type Steps = {
  label: string;
  component: ReactNode;
};
interface IHorizontalNonLinearStepper {
  steps: Steps[];
  next?: boolean;
  setNext?: Dispatch<SetStateAction<boolean>>;
  reset?: boolean;
  setReset?: Dispatch<SetStateAction<boolean>>;
}

export const HorizontalNonLinearStepper: FC<IHorizontalNonLinearStepper> = ({
  steps,
  next,
  setNext,
  reset,
  setReset,
}) => {
  const { activeStep, completed, handleStep, handleReset, handleNext } =
    useStepper(steps.length, setNext, setReset, reset);

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  useEffect(() => {
    if (next) {
      handleNext();
    }
  }, [handleNext, next]);

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
              onClick={() => handleStep(index)} // Wrap it in a function
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
              {steps[activeStep]?.component || (
                <Typography>{t("no_content")}</Typography>
              )}
            </Box>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              //needed
              <ButtonMui
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t("back")}
              </ButtonMui>
              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonMui onClick={handleNext} sx={{ mr: 1 }}>
                {t("next")}
              </ButtonMui>
            </Box> */}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};
