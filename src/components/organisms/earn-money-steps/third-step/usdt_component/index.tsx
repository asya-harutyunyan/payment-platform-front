import InformationIcon from "@/assets/images/information_icon.svg";
import NewButton from "@/components/atoms/btn";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetDeposit } from "@/store/reducers/user-info/depositSlice";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
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
}) => {
  const { handleSubmit, onSubmit, control, watch } = useDepositUsdt();
  const dispatch = useAppDispatch();

  const transactionId = watch("transaction_id");

  const { deposit } = useAppSelector((state) => state.deposit);
  const timer = useMemo(() => {
    return new Date(
      dayjs()
        .add(
          (dayjs.utc(deposit?.created_at).add(30, "minutes").unix() -
            dayjs().utc().unix()) *
          1000,
          "milliseconds"
        )
        .format()
    );
  }, [deposit]);

  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return <span>Ваше время истекло.</span>;
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
      maxWidth={432}
      gap="32px"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { lg: "100%", md: "100%", xs: "100%", sm: "100%" },
        }}
      >
        <P color="black" maxWidth="468px" m="16px 0 10px 0">
          После завершения транзакции введите Hash транзакции и подтвердите её в течение{' '}
          <span style={{ color: "#4477b7" }}>
            <Countdown
              date={timer}
              renderer={countDownrenderer}
              onComplete={onTimerComplete}
            />

          </span> минут.
        </P>
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
                backgroundColor: "#F8F8F8",
                borderRadius: "16px",
                borderBottom: "1px solid #000",
                padding: "32.5px 16px",
                display: "flex",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <P fontSize={"15px"} color="#000">
                  {t("address")}:
                </P>
                <P
                  fontSize={{
                    lg: "15px",
                    md: "15px",
                    xs: "10px",
                    sm: "10px",
                  }}
                  color="#4477b7"
                  paddingLeft={"5px"}
                >
                  {deposit?.wallet.address}
                </P>
                {deposit?.wallet.address && (
                  <CopyButton text={deposit.wallet.address} />
                )}
              </Box>
              <P fontSize={"15px"} color="#000" paddingBottom={"10px"}>
                {t("network")}: <span style={{ color: "#4477b7" }}>{deposit?.wallet.network}</span>
              </P>
              <P fontSize="15px" color="#000" paddingBottom="10px">
                {t("amount")}:{" "}
                <span style={{ color: "#4477b7" }}>
                  {t("rate_text", {
                    converted_amount: `${deposit?.converted_amount.toFixed(2)} ${deposit?.wallet.currency}`,
                    deposit_amount: `${deposit.amount} ${deposit.deposit_currency}`,
                    rate: `${(deposit.amount / deposit.converted_amount).toFixed(2)} ${deposit.deposit_currency}`,
                    convert_currency: deposit.wallet.currency,
                  })}
                </span>
              </P>

            </Box>

          </Box>
        )}


        <Box
          sx={{
            width: "432px",
            display: "flex",
          }}
        >
          <FormTextInput
            control={control}
            name="transaction_id"
            placeholder={t("hash")}
            lightGreyVariant
          />
        </Box>
        <Box
          sx={{
            width: "432px",
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <NewButton
            variant={"gradient"}
            disabled={!transactionId}
            text={t("confirm")}
            type="submit"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap="8px" maxWidth={432}>
          <Box width="20px" height="20px">
            <img
              src={InformationIcon}
              alt="Information icon"
              style={{ width: "100%" }}
            />{" "}
          </Box>
          <P
            color="#000"
            sx={{ fontWeight: 400, fontSize: "12px" }}
          >
            Скопируйте и вставьте Hash транзакции из{" "}
            <a
              href="https://tronscan.org/#/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 700,
                color: "#4477b7",
                textDecoration: "underline",
              }}
            >
              tronscan.org
            </a>
          </P>
        </Box>
      </Box>
      <Box sx={{
        width: {
          xs: "max-content",
          md: "200px",
        },
      }}>

        <Box
          sx={{
            width: "100%",
            margin: {
              lg: "0",
              md: "0",
              xs: "20px auto",
              sm: "20px auto",
            },
          }}
        >
          <img src={deposit?.wallet.qr_code} style={{ width: "140px" }} />
        </Box>
        <Box bgcolor="#c7d9ed" borderRadius="12px" p="12px 14px">
          <P color="#007AFF">Отсканируйте QR код</P>
        </Box>
      </Box>
    </Box>
  );
};
