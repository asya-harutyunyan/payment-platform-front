import third_step from "@/assets/images/step_3.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { resetDeposit } from "@/store/reducers/user/depositSlice";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { Dispatch, FC, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import useBankDetalis from "./_services/useDeposit";

interface IStepThree {
  handleNext?: () => void;
  setActiveStep?: Dispatch<number>;
}
export const StepThree: FC<IStepThree> = ({ handleNext, setActiveStep }) => {
  const { handleSubmit, onSubmit, control } = useBankDetalis();
  const dispatch = useAppDispatch();
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
      // Render a completed state
      return <span></span>;
    } else {
      // Render a countdown
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: "300px",
        }}
        bg={third_step}
        title={t("step_c")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1p solid red",
          }}
        >
          <P
            fontSize={"16px"}
            color="tertiary.main"
            paddingBottom={"10px"}
            paddingTop={"20px"}
          >
            Address: {deposit?.wallet.address}
          </P>
          <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
            Currency: {deposit?.wallet.currency}
          </P>
          <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
            Network: {deposit?.wallet.network}
          </P>
          <Box sx={{ width: "60%" }}>
            <FormTextInput
              control={control}
              name="transaction_id"
              placeholder="Transaction ID"
              type="number"
              whiteVariant={true}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Button
              variant={"outlinedBlue"}
              text={"Back"}
              sx={{ marginRight: "30px", width: "150px", height: "40px" }}
            />
            <Button
              variant={"gradient"}
              text={"Confirm"}
              onClick={() => handleNext?.()}
              sx={{ width: "150px", height: "40px" }}
            />
          </Box>
          <P color="tertiary.main" sx={{ textDecoration: "underline" }}>
            Keep going for{" "}
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
