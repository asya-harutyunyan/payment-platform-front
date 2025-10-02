import third_step from "@/assets/images/step_3_bg.png";
import third_step_cripto_bg from "@/assets/images/step_3_bg_2.png";

import { BasicCard } from "@/components/atoms/card";
import { useAppSelector } from "@/store";
import { H2 } from "@/styles/typography";
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
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "100%",
      }}
    >
      <BasicCard
        sx={{
          width: "100%",
          p: 0,
          m: 0,
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "relative",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "center bottom",
            sm: "center calc(100% + 50px)",
          },
          backgroundSize: { xs: "100% 40%", md: "100% 80%" },
          borderRadius: { xs: "0 0 0 0", sm: "0 0 170px 170px" },
          backgroundImage:
            deposit?.type === DEPOSIT_TYPES.CRYPTO
              ? `url(${third_step_cripto_bg})`
              : `url(${third_step})`,
        }}
      >
        <Box
          width="100%"
          sx={{
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {deposit?.type === DEPOSIT_TYPES.CRYPTO ? (
            <H2
              color="#000000"
              align="center"
              sx={{ width: "100%", p: 0, mt: "20px", fontWeight: 500 }}
              fontSize={{ xs: "16px", md: "32px" }}
            >
              Отправьте <span style={{ fontWeight: 600 }}>USDT</span> в сети{" "}
              <span style={{ fontWeight: 600 }}>TRC20</span> на указанный ниже
              адрес:
            </H2>
          ) : (
            <H2
              color="#000000"
              align="center"
              sx={{ width: "100%", p: 0, mt: "20px" }}
              fontSize={{ xs: "16px", md: "32px" }}
            >
              {t("step_c")}
            </H2>
          )}

          {deposit?.type === DEPOSIT_TYPES.CRYPTO ? (
            <USDTComponent
              handleNext={handleNext}
              setActiveStep={setActiveStep}
            />
          ) : deposit?.type === undefined || deposit?.type === null ? (
            <TYPEComponent handleNext={handleNext} />
          ) : null}
        </Box>
      </BasicCard>
    </Box>
  );
};
