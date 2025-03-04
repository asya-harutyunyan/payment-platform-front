import success from "@/assets/images/success.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { useAppSelector } from "@/store";
import { H4, H6, P } from "@/styles/typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { FC, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
interface ISuccess {
  handleReset?: () => void;
}
export const Success: FC<ISuccess> = ({ handleReset }) => {
  const { deposit } = useAppSelector((state) => state.deposit);
  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return (
        <H6 align="center" sx={{ textDecoration: "underline" }}>
          Ваше время истекло, пожалуйста, свяжитесь с поддержкой.
        </H6>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <H4>Загрузка..</H4>
          <CircularProgress sx={{ color: "white" }} />
          <P color="text.secondary" padding={"10px 0"}>
            {formatted.minutes}:{formatted.seconds}
          </P>
        </Box>
      );
    }
  };

  const getTimer = (created_at: string) => {
    return new Date(
      dayjs()
        .add(
          (dayjs.utc(created_at).add(15, "minutes").unix() -
            dayjs().utc().unix()) *
            1000,
          "milliseconds"
        )
        .format()
    );
  };
  const renderStatus = useMemo(() => {
    switch (deposit?.status_by_admin) {
      case DEPOSIT_STATUSES.PENDING:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Countdown
              date={getTimer(deposit.created_at as string)}
              renderer={countDownrenderer}
            />
            <P color="primary.contrastText" padding={"20px 0"} align="center">
              Ваш депозит обрабатывается, это обычно занимает до 15 минут.
              Пожалуйста ожидайте подтверждения поступления депозита. После
              этого перейдите в раздел Список запросов и подтверждайте
              исключительно те заказы, которые были получены Вами на карту.
            </P>
          </Box>
        );
      case DEPOSIT_STATUSES.DONE:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <P
              color="tertiary.main"
              sx={{
                textAlign: {
                  lg: "start",
                  md: "start",
                  xs: "center",
                  sm: "center",
                },
              }}
            >
              {t("success_step")}
            </P>
            <img src={success} style={{ width: "100%" }} />
            <Button
              variant={"gradient"}
              sx={{ width: "230px" }}
              text={t("start_again")}
              onClick={() => handleReset?.()}
            />
          </Box>
        );
      case DEPOSIT_STATUSES.CANCELED:
      case DEPOSIT_STATUSES.FAILED:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "white" }} fontSize="large" />
            <H4 align="center">Платеж отклонен или отменен</H4>
          </Box>
        );
      case DEPOSIT_STATUSES.EXPRIED:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "white" }} fontSize="large" />
            <H4 align="center">Срок платежа истек</H4>
          </Box>
        );
      default:
        <></>;
        break;
    }
  }, [deposit?.status_by_admin]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: {
            lg: "370px",
            md: "370px",
            xs: "max-content",
            sm: "max-content",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        title={t("success")}
      >
        <Box
          sx={{
            display: { lg: "flex", md: "flex", xs: "flex", sm: "flex" },
            width: "100%",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderStatus}
        </Box>
      </BasicCard>
    </Box>
  );
};
