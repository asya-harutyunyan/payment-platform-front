import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import { useAppDispatch } from "@/store";
import { confirmDepositThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import theme from "@/styles/theme";
import { H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { FC, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { usePaymentConfirmationModal } from "./usePaymentConfirmationModal";

export const PaymentPlatformModal: FC = () => {
  const { opened, close, data } = usePaymentConfirmationModal();
  const dispatch = useAppDispatch();
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
  const timer = useMemo(() => {
    console.log(dayjs.utc(data?.order?.created_at), data?.order?.created_at);

    return new Date(
      dayjs()
        .add(
          (dayjs.utc(data?.order?.created_at).add(30, "minutes").unix() -
            dayjs().utc().unix()) *
            1000,
          "milliseconds"
        )
        .format()
    );
  }, [data?.order]);
  const handleConfirmDeposit = (deposit_id: string) => {
    if (deposit_id) {
      dispatch(confirmDepositThunk(deposit_id));
    }
  };

  return (
    <BasicModal open={opened} handleClose={close} width="50%" bg={bg}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <P
          fontSize={"30px"}
          padding={"20px 0"}
          sx={{ color: theme.palette.text.primary }}
        >
          Реквизиты платежа
        </P>
        <P style={{ color: "#fff" }}>
          <span
            style={{
              color: theme.palette.secondary.contrastText,
              paddingRight: "10px",
            }}
          >
            {" "}
            Order ID:{" "}
          </span>
          {data?.order?.order_id}
        </P>
        <P style={{ color: "#fff" }}>
          <span
            style={{
              color: theme.palette.secondary.contrastText,
              paddingRight: "10px",
            }}
          >
            Order Create At:{" "}
          </span>
          {data?.order?.created_at}
        </P>
        <P style={{ color: "#fff" }}>
          <span
            style={{
              color: theme.palette.secondary.contrastText,
              paddingRight: "10px",
            }}
          >
            Order User ID:{" "}
          </span>
          {data?.order?.user_id}
        </P>
        <Button
          variant={"gradient"}
          text={t("confirm")}
          sx={{ margin: "20px 0" }}
          onClick={() => handleConfirmDeposit(String(data?.order?.order_id))}
        />
        <H6 sx={{ textDecoration: "underline", color: "tertiary.main" }}>
          {t("countdown")}{" "}
          <Countdown date={timer} renderer={countDownrenderer} />
        </H6>
      </Box>
    </BasicModal>
  );
};
