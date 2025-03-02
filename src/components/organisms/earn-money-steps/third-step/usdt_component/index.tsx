import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetDeposit } from "@/store/reducers/user-info/depositSlice";
import { P } from "@/styles/typography";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { BaseSyntheticEvent, Dispatch, FC, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import useDepositUsdt from "../_services/useDepositUSDT";

interface IUSDTComponent {
  handleNext?: () => void;
  setActiveStep?: Dispatch<number>;
  handleBack?: () => void;
}
export const USDTComponent: FC<IUSDTComponent> = ({
  handleNext,
  setActiveStep,
  handleBack,
}) => {
  const { handleSubmit, onSubmit, control, watch } = useDepositUsdt();
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { lg: "100%", md: "100%", xs: "100%", sm: "100%" },
        }}
      >
        {deposit?.wallet && (
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
                  fontSize={{
                    lg: "15px",
                    md: "15px",
                    xs: "10px",
                    sm: "10px",
                  }}
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
                {t("network")}: {deposit?.wallet.network}
              </P>
              {/* <P fontSize={"15px"} color="tertiary.main" paddingBottom={"10px"}>
                {t("currency")}: {deposit?.wallet.currency}
              </P> */}
              <P fontSize={"15px"} color="tertiary.main" paddingBottom={"10px"}>
                {`${t("amount")}: ${t("rate_text", {
                  converted_amount: `${deposit?.converted_amount} ${deposit?.wallet.currency}`,
                  deposit_amount: `${deposit.amount} ${deposit.deposit_currency}`,
                  rate: `${(deposit.amount / deposit.converted_amount).toFixed(3)} ${deposit.deposit_currency}`,
                  convert_currency: deposit.wallet.currency,
                })}`}
              </P>
            </Box>
            <Box
              sx={{
                width: {
                  lg: "30%",
                  md: "30%",
                  xs: "max-content",
                  sm: "max-content",
                },
                margin: {
                  lg: "0",
                  md: "0",
                  xs: "20px auto",
                  sm: "20px auto",
                },
              }}
            >
              <img src={deposit?.wallet.qr_code} style={{ width: "119px" }} />
            </Box>
          </Box>
        )}
        <P color="text.secondary">{t("confirm_text_second_step")}</P>

        <Box
          sx={{
            width: { lg: "60%", md: "60%", xs: "100%", sm: "100%" },
            display: "flex",
          }}
        >
          <FormTextInput
            control={control}
            name="transaction_id"
            placeholder={t("hash")}
            whiteVariant={true}
          />
          <Tooltip title={t("hash_tooltip")}>
            <IconButton>
              <InfoIcon sx={{ color: "text.secondary" }} />
            </IconButton>
          </Tooltip>
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
    </Box>
  );
};
