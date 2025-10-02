import Completed from "@/assets/images/step_completed.svg";
import NotCompleted from "@/assets/images/step_not_completed.svg";
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
      {(activeStep > 0 || Object.keys(completed).length > 0) && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 25,
            zIndex: 10,
          }}
        >
          <Box
            component="button"
            onClick={handleStartOver}
            borderRadius="48px"
            p="13.5px 18px"
            bgcolor="transparent"
            sx={{
              border: "none",
              cursor: "pointer",
              borderBottom: "2px solid #052046",
              "&:hover": {
                scale: 1.1,
              },
            }}
          >
            <Typography
              sx={{
                color: "#008ef4",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Начать сначала
            </Typography>
          </Box>
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: 28, lg: 36 },
            left: "12%",
            width: "75%",
            mt: "70px",
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
          mt: { xs: "60px", lg: "70px" },
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

      <div style={{ height: "100%", marginTop: "20px" }}>
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
