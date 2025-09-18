import Completed from "@/assets/images/step_completed.svg";
import NotCompleted from "@/assets/images/step_not_completed.svg";

import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import Box from "@mui/material/Box";
import ButtonMui from "@mui/material/Button";
import Step from "@mui/material/Step";
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
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        bgcolor: "#EAEAEA",
        borderRadius: "40px",
        pt: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 20 + 16,
          left: "12%",
          width: "75%",
          height: 4,
          background:
            "linear-gradient(90deg, #153762 0%, #0B62A1 40%, #1AA1FF 100%)",
          borderRadius: 2,
          zIndex: 1,
          transition: "width 250ms ease",
        }}
      />
      <Stepper
        activeStep={activeStep}
        sx={{
          display: "flex!important",
          width: "100%",
          m: "0 auto",
          position: "relative",
          zIndex: 2,
          
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <Step
              completed={completed[index]}
              sx={{
                color: theme.palette.primary.main,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {index <= activeStep ? (
                <img
                  src={Completed}
                  alt="Completed step"
                  style={{ width: 32, height: 32, zIndex: 1 }}
                />
              ) : (
                <img
                  src={NotCompleted}
                  alt="Not completed step"
                  style={{ width: 32, height: 32, zIndex: 1 }}
                />
              )}
              <P
                sx={{
                  mt: 1,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: activeStep === index ? "#153762" : "#017FED",
                  textAlign: "center",
                }}
              >
                {t(step.label)}
              </P>


            </Step>
          </React.Fragment>
        ))}
      </Stepper>

      <div style={{ height: "90%" }}>
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
            <Box sx={{ mt: 2, mb: 1, height: "100%" }}>
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
