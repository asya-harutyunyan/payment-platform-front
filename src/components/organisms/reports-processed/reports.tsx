import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { H5, P } from "@/styles/typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
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
        <Paper
          elevation={3}
          sx={{
            width: { lg: "60%", md: "60%", xs: "80%", sm: "80%" },
            height: "max-content",
            margin: "20px",
            padding: "20px",
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
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                Общее количество карт:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.payment_method_count ?? 0}
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} color="primary.main" paddingRight={"5px"}>
                Сумма всех депозитов (общая):{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.total_amount ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                {" "}
                Сумма прибыли:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.profits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                Сумма депозитов, сделанных картой:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.crypto_deposits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                Сумма депозитов, сделанных картой:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.card_deposits ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                Сумма, подтверждённая пользователями:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.orders_done_amount ?? 0}₽
              </H5>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize={"1.2rem"} paddingRight={"5px"}>
                Сумма, не подтверждённая пользователями:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {admingetProcessedAmounts.orders_in_progress_amount ?? 0}₽
              </H5>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
