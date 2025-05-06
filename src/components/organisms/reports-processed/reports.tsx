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
              <H5 color="primary.main" paddingRight={"5px"}>
                Общее количество карт:{" "}
              </H5>
              <P>{admingetProcessedAmounts.payment_method_count ?? 0}</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                Сумма всех депозитов (общая):{" "}
              </H5>
              <P>{admingetProcessedAmounts.total_amount ?? 0}₽</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                {" "}
                Сумма прибыли:{" "}
              </H5>
              <P>{admingetProcessedAmounts.profits ?? 0}₽</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                {" "}
                Сумма депозитов, сделанных картой:{" "}
              </H5>
              <P>{admingetProcessedAmounts.crypto_deposits ?? 0}₽</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                Сумма депозитов, сделанных картой:{" "}
              </H5>
              <P>{admingetProcessedAmounts.card_deposits ?? 0}₽</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                {" "}
                Сумма, подтверждённая пользователями:{" "}
              </H5>
              <P>{admingetProcessedAmounts.orders_done_amount ?? 0}₽</P>
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
              <H5 color="primary.main" paddingRight={"5px"}>
                {" "}
                Сумма, не подтверждённая пользователями:{" "}
              </H5>
              <P>{admingetProcessedAmounts.orders_in_progress_amount ?? 0}₽</P>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
