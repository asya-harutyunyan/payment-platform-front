import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { H5, P } from "@/styles/typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { t } from "i18next";
import useReports from "./_services/useReports";

export const ReportsSummary = () => {
  const {
    loadingAndTotal,

    orders_stats,
  } = useReports();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("reports-summary")} />
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
                Отправленные заказы:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.order_count ?? 0}
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
                Общая сумма заказов:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.total_amount ?? 0}₽
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
                Сумма по выданным заказам:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.total_amount_with_deposit ?? 0}₽
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
                Сумма подтвержденных заказов:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.total_done_ammount ?? 0}₽
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
                Заказы без карты:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.order_witouth_card_count ?? 0}
              </H5>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
