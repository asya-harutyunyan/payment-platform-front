import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { MonthPicker } from "@/components/atoms/month-picker";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch } from "@/store";
import { GetPlatformXThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { H5, P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import useReports from "./_services/useReports";

type FormData = z.infer<typeof add_wallet_schema>;

export const ReportsSummary = () => {
  const dispatch = useAppDispatch();
  const { orders_stats, loadingDeposits } = useReports();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(add_wallet_schema),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const from = watch("from");
  const to = watch("to");

  const [debouncedFrom] = useDebounce(
    from && dayjs(from).isValid() ? dayjs(from).format("DD.MM.YYYY") : "",
    2000
  );
  const [debouncedTo] = useDebounce(
    to && dayjs(to).isValid() ? dayjs(to).format("DD.MM.YYYY") : "",
    2000
  );

  useEffect(() => {
    if (isDatePickerOpen) return;
    const isValidRange =
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();

    dispatch(
      GetPlatformXThunk({
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
      })
    );
  }, [debouncedTo, debouncedFrom]);

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("reports-summary")} />
      {loadingDeposits ? (
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
              width: "100%",
              flexDirection: { lg: "row", md: "row", xs: "column" },
            }}
          >
            <Box sx={{ marginRight: { lg: "20px", md: "0", xs: "0" } }}>
              <MonthPicker
                name="from"
                control={control}
                onOpen={() => setIsDatePickerOpen(true)}
                onClose={() => setIsDatePickerOpen(false)}
              />
            </Box>
            <MonthPicker
              name="to"
              control={control}
              onOpen={() => setIsDatePickerOpen(true)}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </Box>
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
                {orders_stats.order_count}
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
                {orders_stats.total_amount}₽
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
                {orders_stats.total_amount_with_deposit}₽
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
                {orders_stats.total_done_amount}₽
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
                Количество выполненного заказа:{" "}
              </P>
              <H5 color="primary.main" sx={{ fontWeight: 400 }}>
                {orders_stats.done_order_count}
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
                {orders_stats.orders_without_card_count}
              </H5>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
