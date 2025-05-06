import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { H5, P } from "@/styles/typography";
import { Box } from "@mui/material";
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
                Отправленные заказы:{" "}
              </H5>
              <P>{orders_stats.order_count ?? 0}</P>
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
                Общая сумма заказов:{" "}
              </H5>
              <P>{orders_stats.total_amount ?? 0}₽</P>
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
                Сумма по выданным заказам:{" "}
              </H5>
              <P>{orders_stats.total_amount_with_deposit ?? 0}₽</P>
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
                Сумма подтвержденных заказов:{" "}
              </H5>
              <P>{orders_stats.total_done_ammount ?? 0}₽</P>
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
                Заказы без карты:{" "}
              </H5>
              <P>{orders_stats.order_witouth_card_count ?? 0}</P>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
