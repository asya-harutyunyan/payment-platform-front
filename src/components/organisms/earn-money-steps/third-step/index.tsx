import third_step from "@/assets/images/step_3.png";
import { BasicCard } from "@/components/atoms/card";
import { useAppSelector } from "@/store";
import { Box } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC } from "react";
import { DEPOSIT_TYPES } from "./enums";
import { TYPEComponent } from "./feat_component";
import { USDTComponent } from "./usdt_component";

interface IStepThree {
  handleNext?: () => void;
  setActiveStep?: Dispatch<number>;
  handleBack?: () => void;
}

export const StepThree: FC<IStepThree> = ({ handleNext, setActiveStep }) => {
  const { deposit } = useAppSelector((state) => state.deposit);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <BasicCard
        sx={{
          width: "100%",
          padding: "0",
          height: { lg: "390px", md: "390px", xs: "400px", sm: "400px" },
          display: "flex",
        }}
        bg={third_step}
        title={t(deposit?.type === DEPOSIT_TYPES.CRYPTO ? "step_d" : "step_c")}
      >
        {deposit?.type === DEPOSIT_TYPES.CRYPTO ? (
          <USDTComponent
            handleNext={handleNext}
            setActiveStep={setActiveStep}
          />
        ) : deposit?.type === undefined || deposit?.type === null ? (
          <TYPEComponent handleNext={handleNext} />
        ) : null}
      </BasicCard>
    </Box>
  );
};
