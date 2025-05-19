import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { MonthPicker } from "@/components/atoms/month-picker";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch } from "@/store";
import { getProcessedAmountsThunk } from "@/store/reducers/user-info/reportSlice/thunks";
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

export const ReportsProccesedAmount = () => {
  const { admingetProcessedAmounts, loading } = useReports();
  const dispatch = useAppDispatch();
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
      dayjs(debouncedFrom).isValid() || dayjs(debouncedTo).isValid();

    dispatch(
      getProcessedAmountsThunk({
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
      })
    );
  }, [debouncedTo, debouncedFrom]);

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("processed-amounts")} />
      {loading ? (
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
