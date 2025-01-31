import third_step from "@/assets/images/step_3.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { resetDeposit } from "@/store/reducers/user-info/depositSlice";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { BaseSyntheticEvent, Dispatch, FC, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import useBankDetalis from "./_services/useDeposit";

interface IStepThree {
  handleNext?: () => void;
  setActiveStep?: Dispatch<number>;
  handleBack?: () => void;
}
export const StepThree: FC<IStepThree> = ({
  handleNext,
  setActiveStep,
  handleBack,
}) => {
  const { handleSubmit, onSubmit, control, watch } = useBankDetalis();
  const dispatch = useAppDispatch();

  const transactionId = watch("transaction_id");

  const { deposit } = useAppSelector((state) => state.deposit);
  const timer = useMemo(() => {
    return new Date(
      dayjs()
        .add(
          (dayjs.utc(deposit?.created_at).add(10, "minutes").unix() -
            dayjs().utc().unix()) *
            1000,
          "milliseconds"
        )
        .format()
    );
  }, [deposit]);

  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return <span>Your time is end</span>;
    } else {
      return (
        <span>
          {formatted.minutes}:{formatted.seconds}
        </span>
      );
    }
  };

  const onTimerComplete = () => {
    dispatch(resetDeposit());
    setActiveStep?.(0);
  };
  const submitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
    handleNext?.();
  };

  return (
    <Box
      component="form"
      onSubmit={submitForm}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: { lg: "350px", md: "350px", xs: "400", sm: "400px" },
          display: "flex",
        }}
        bg={third_step}
        title={t("step_c")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { lg: "70&", md: "70%", xs: "100%", sm: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                xs: "column",
                sm: "column",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <P fontSize={"15px"} color="tertiary.main">
                  {t("address")}:
                </P>
                <P
                  fontSize={{ lg: "15px", md: "15px", xs: "10px", sm: "10px" }}
                  color="tertiary.main"
                  paddingLeft={"5px"}
                >
                  {deposit?.wallet.address}
                </P>
                {deposit?.wallet.address && (
                  <CopyButton text={deposit.wallet.address} />
                )}
              </Box>
              <P fontSize={"15px"} color="tertiary.main" paddingBottom={"10px"}>
                {t("currency")}: {deposit?.wallet.currency}
              </P>
              <P fontSize={"15px"} color="tertiary.main" paddingBottom={"10px"}>
                {t("network")}: {deposit?.wallet.network}
              </P>
            </Box>{" "}
            <Box
              sx={{
                width: {
                  lg: "30%",
                  md: "30%",
                  xs: "max-content",
                  sm: "max-content",
                },
                margin: { lg: "0", md: "0", xs: "20px auto", sm: "20px auto" },
              }}
            >
              <img src={deposit?.wallet.qr_code} style={{ width: "119px" }} />
            </Box>
          </Box>

          <Box sx={{ width: { lg: "60%", md: "60%", xs: "100%", sm: "100%" } }}>
            <FormTextInput
              control={control}
              name="transaction_id"
              placeholder="Transaction ID"
              whiteVariant={true}
            />
          </Box>
          <Box
            sx={{
              width: { lg: "60%", md: "60%", xs: "100%", sm: "100%" },
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Button
              variant={"outlinedBlue"}
              text={t("back")}
              onClick={() => handleBack?.()}
              sx={{ marginRight: "20px", width: "48%", height: "50px" }}
            />
            <Button
              variant={"gradient"}
              disabled={!transactionId}
              text={t("confirm")}
              type="submit"
              sx={{ width: "48%", height: "50px" }}
            />
          </Box>
          <P
            color="tertiary.main"
            sx={{
              textDecoration: "underline",
              paddingTop: "10px",
              fontWeight: "700",
              margin: { lg: "0", md: "0", xs: "0 auto", sm: "0 auto" },
              backgroundColor:
                "linear-gradient(to right,#041F44,#0A4DAA,#041F44)",
            }}
          >
            {t("timer")}{" "}
            <Countdown
              date={timer}
              renderer={countDownrenderer}
              onComplete={onTimerComplete}
            />
          </P>
        </Box>
      </BasicCard>
    </Box>
  );
};
