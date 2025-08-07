import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import Button from "@/components/atoms/button";
import { MonthPicker } from "@/components/atoms/month-picker";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch } from "@/store";
import {
  downloadReportThunk,
  getProcessedAmountsThunk,
} from "@/store/reducers/user-info/reportSlice/thunks";
import {
  EReportFormats,
  EReportKeys,
} from "@/store/reducers/user-info/reportSlice/types";
import { H5, P } from "@/styles/typography";
import { downloadFileWithURL } from "@/utils";
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
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();

    dispatch(
      getProcessedAmountsThunk({
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
      })
    );
  }, [debouncedTo, debouncedFrom]);

  const onDownloadClick = async (format: EReportFormats) => {
    const { url, filename } = await dispatch(
      downloadReportThunk({
        key: EReportKeys.by_processed_amounts,
        format,
        from: debouncedFrom,
        to: debouncedTo,
      })
    ).unwrap();

    downloadFileWithURL(url, filename);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("processed-amounts")}
        renderComponent={
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              text="Скачать в CSV"
              variant="contained"
              onClick={() => onDownloadClick(EReportFormats.csv)}
            />
            <Button
              text="Скачать в Excel"
              variant="contained"
              onClick={() => onDownloadClick(EReportFormats.excel)}
            />
          </Box>
        }
      />
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
                width="130px"
                name="from"
                control={control}
                onOpen={() => setIsDatePickerOpen(true)}
                onClose={() => setIsDatePickerOpen(false)}
              />
            </Box>
            <MonthPicker
              width="130px"
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
                Сумма депозитов, сделанных криптой:{" "}
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
