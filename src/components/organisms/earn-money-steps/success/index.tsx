import success from "@/assets/images/success.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { useAppSelector } from "@/store";
import { H4, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useMemo } from "react";
interface ISuccess {
  handleReset?: () => void;
}
export const Success: FC<ISuccess> = ({ handleReset }) => {
  const { deposit } = useAppSelector((state) => state.deposit);

  const renderStatus = useMemo(() => {
    switch (deposit?.status_by_admin) {
      case DEPOSIT_STATUSES.PENDING:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "200px",
              width: "100%",
            }}
          >
            <H6 align="center" color="tertiary.main">
              Загрузка..
            </H6>
            <CircularIndeterminate color="white" />
            <P color="primary.contrastText" padding={"20px 0"} align="center">
              Для совершения депозита в Вашей карты, пожалуйста, обратитесь в
              чат Вам будет выдан номер карты, на который необходимо перевести
              Ваш депозит Пожалуйста, отправляйте среда ва для депозита только с
              той карты, на которую будут возвращаться средства депозита и
              Вашего заработка. Использование иных карт для депозита запрещено.
            </P>
          </Box>
        );
      case DEPOSIT_STATUSES.DONE:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { lg: "200px", md: "200px", xs: "140px", sm: "140px" },
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
          </Box>
        );
      case DEPOSIT_STATUSES.CANCELED:
      case DEPOSIT_STATUSES.FAILED:
        return <H4 align="center">Платеж отклонен или отменен</H4>;
      case DEPOSIT_STATUSES.EXPRIED:
        return <H4 align="center">Срок платежа истек</H4>;
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
          height: "330px",
          display: "flex",
          alignItems: "center",
        }}
        title={t("success")}
      >
        <Box
          sx={{
            width: "100%",
            height: "230px",
            display: "flex",
            justifyContent: "space-between",

            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: { lg: "flex", md: "flex", xs: "flex", sm: "flex" },
              width: "90%",
              height: "200px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderStatus}
          </Box>
          <Button
            variant={"gradient"}
            sx={{ width: "230px", margin: "30px auto" }}
            text={t("start_again")}
            onClick={() => handleReset?.()}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
