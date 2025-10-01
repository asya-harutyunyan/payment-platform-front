import Completed from "@/assets/images/step_completed.svg";
import NotCompleted from "@/assets/images/step_not_completed.svg";
import NewButton from "@/components/atoms/btn";
import { useFormSteps } from "@/context/form-steps.context";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonMui from "@mui/material/Button";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ReactNode } from "@tanstack/react-router";
import { t } from "i18next";
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
    handleReset,
    handleNext,
    handleBack,
    setActiveStep,
  } = useStepper(steps.length);

  const { startOver } = useFormSteps();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleStartOver = () => {
    startOver();
    handleReset();
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        bgcolor: "#EAEAEA",
        borderRadius: "40px",
        pt: "20px",
        position: "relative",
        px: { xs: "14px", md: "0" },
      }}
    >
      {/* Кнопка "Начать сначала" */}
      {(activeStep > 0 || Object.keys(completed).length > 0) && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          <NewButton
            variant="outlined"
            text="Начать сначала"
            onClick={handleStartOver}
            sx={{
              fontSize: "7px",
              padding: "6px 12px",
              width: "70px",
              height: "32px",
              borderColor: "#047ced",
              color: "#047ced",
              "&:hover": {
                backgroundColor: "#047ced",
                color: "white",
              },
            }}
          />
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 36,
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
      )}

      <Stepper
        activeStep={activeStep}
        sx={{
          width: "100%",
          m: "0 auto",
          position: "relative",
          zIndex: 2,
          display: "flex!important",
          alignItems: "flex-start",
          justifyContent: isMobile ? "flex-start" : "space-between",
        }}
      >
        {steps.map((step, index) => {
          if (isMobile && index !== activeStep) return null;

          return (
            <Step
              key={step.label}
              completed={completed[index]}
              sx={{
                width: isMobile ? "auto" : "100%",
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                gap: "4px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index <= activeStep ? (
                <img
                  src={Completed}
                  alt="Completed step"
                  style={{ width: 32, height: 32 }}
                />
              ) : (
                <img
                  src={NotCompleted}
                  alt="Not completed step"
                  style={{ width: 32, height: 32 }}
                />
              )}
              <P
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: activeStep === index ? "#153762" : "#017FED",
                  textAlign: "center",
                }}
              >
                {t(step.label)}
              </P>
            </Step>
          );
        })}
      </Stepper>

      <div style={{ height: "100%" }}>
        {allStepsCompleted() ? (
          <BasicCard sx={{ height: "100%" }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {t("complated_steps")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonMui onClick={handleReset}>Reset</ButtonMui>
            </Box>
          </BasicCard>
        ) : (
          <Box sx={{ mt: 2, height: "100%" }}>
            {steps[activeStep]?.component({
              handleNext,
              handleReset,
              handleBack,
              setActiveStep,
            }) || <Typography>{t("no_content")}</Typography>}
          </Box>
        )}
      </div>
    </Box>
  );
};
