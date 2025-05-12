import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { H5, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import useReports from "./_services/useReports";

export const ReportsProccesedAmount = () => {
  const {
    loadingAndTotal,

    admingetProcessedAmounts,
  } = useReports();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("processed-amounts")} />
      {loadingAndTotal.loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                Общее количество карт:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.payment_method_count ?? 0}
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} color="primary.main" paddingRight={"5px"}>
                Сумма всех депозитов (общая):{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.total_amount ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                {" "}
                Сумма прибыли:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.profits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                Сумма депозитов, сделанных картой:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.crypto_deposits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                Сумма депозитов, сделанных картой:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.card_deposits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                Сумма, подтверждённая пользователями:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.orders_done_amount ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  xs: "space-between",
                  sm: "space-between",
                },
              }}
            >
              <P fontSize={"1.1rem"} paddingRight={"5px"}>
                Сумма, не подтверждённая пользователями:{" "}
              </P>
              <H5 color="primary.main">
                {admingetProcessedAmounts.orders_in_progress_amount ?? 0}₽
              </H5>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
