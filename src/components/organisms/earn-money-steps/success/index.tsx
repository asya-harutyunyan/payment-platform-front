import fail from "@/assets/images/last_step_fail.svg";
import last_step from "@/assets/images/last_step_gradient.png";
import success from "@/assets/images/success_last_step.png";
import { httpClient } from "@/common/api";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateDepositAdminStatus } from "@/store/reducers/user-info/depositSlice";
import { H1, H2, H5, H6, P } from "@/styles/typography";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { FC, useEffect, useMemo } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
interface ISuccess {
  handleReset?: () => void;
}
export const Success: FC<ISuccess> = ({ handleReset }) => {
  const { deposit } = useAppSelector((state) => state.deposit);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return (
        <H6 align="center" sx={{ textDecoration: "underline", color: "#000" }}>
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
          <H5 color="#008ef4" mb="24px">Загрузка...</H5>
          <CircularProgress
            sx={{ color: "#008ef4" }}
            size={50}
          />
          <H5 color="#000" padding={"24px 0"}>
            {formatted.minutes}:{formatted.seconds}
          </H5>
        </Box>
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      httpClient
        .get(`/deposits/check-deposit-status/${deposit?.id}`)
        .then(({ data }) => {
          dispatch(updateDepositAdminStatus(data.status));
        });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTimer = (created_at: string) => {
    return new Date(
      dayjs()
        .add(
          (dayjs
            .utc(created_at)
            .add(deposit?.type === "FIAT" ? 40 : 20, "minutes")
            .unix() -
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
              maxWidth: "587px",
              alignItems: "center",
              height: "100%"
            }}
          >
            <H2 color="#000" fontSize={{ xs: "16px", sm: "32px" }} textAlign="center">{t("success")}</H2>
            <Countdown
              date={getTimer(deposit?.created_at as string)}
              renderer={countDownrenderer}
            />
            <P color="black" padding={"20px 0"} align="center">
              Ваш депозит обрабатывается, это обычно занимает до{" "}
              {deposit?.type === "FIAT" ? "40" : "20"} минут. Пожалуйста
              ожидайте подтверждения поступления депозита. После этого перейдите
              в раздел Список запросов и подтверждайте исключительно те заказы,
              которые были получены Вами на карту.
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
              marginBottom: "90px",
            }}
          >
            <Box
              width={{ xs: "300px", sm: "349px" }}
              height={{ xs: "280px", sm: "320px" }}
              position="relative"
              mb="16px"
              sx={{ overflow: "hidden" }}
            >
              <img
                src={success}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box maxWidth={208} position="absolute" top={{ xs: "55px", sm: "65px" }} left={{ xs: "10px", sm: "40px" }}>
                <H1
                  color="white"
                  textAlign="center"
                  fontWeight={600}
                  sx={{
                    zIndex: 1,
                  }}
                >
                  Готово
                </H1>
                <P
                  color="white"
                  sx={{
                    textAlign: "center",
                    zIndex: 1,
                  }}
                >
                  {t("success_step")}
                </P>
              </Box>
            </Box>

            <NewButton
              variant={"gradient"}
              sx={{ width: "327px" }}
              text={"К заказам"}
              onClick={() => {
                handleReset?.();
                navigate({ to: "/orders" });
              }}
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
            <H2 color="#000" fontSize={{ xs: "16px", sm: "32px" }} textAlign="center">{t("success")}</H2>
            <H5 color="#008ef4">Ошибка</H5>
            <Box
              sx={{
                width: "156px", height: "100px"
              }}
            >
              <img src={fail} alt="Fail icon" />
            </Box>
            <P
              align="center"
              color="#000"
              paddingTop={"22px"}
            >
              Платеж отклонен или отменен, попробуйте еще раз.
            </P>
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
            <H2 color="#000" fontSize={{ xs: "16px", sm: "32px" }} textAlign="center">{t("success")}</H2>
            <H5 color="#008ef4" p="24px 0">Срок платежа истек</H5>
            <Box
              sx={{
                width: "156px", height: "100px"
              }}
            >
              <img src={fail} alt="Fail icon" />
            </Box>
          </Box>
        );
      default:
        <></>;
        break;
    }
  }, [deposit?.status_by_admin]);

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "100%",
      overflow: "hidden"
    }}>
      <BasicCard
        sx={{
          width: "100%",
          p: 0,
          pt: "66px",
          m: 0,
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: { xs: "100% 30%", md: "100% 70%" },
          backgroundImage: `url(${last_step})`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderStatus}

        </Box>
      </BasicCard >
    </Box >
  );
};
