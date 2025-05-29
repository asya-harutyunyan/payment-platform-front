import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { platipay_schema } from "@/schema/platipay_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { Platipay } from "@/store/reducers/user-info/depositSlice/types";
import { platipayThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof platipay_schema>;

const usePlatipayService = () => {
  const {
    platipay,
    total,
    loading,
    done_count,
    progress_count,
    not_gived_count,
    expired_count,
  } = useAppSelector((state) => state.reports);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { user } = useAuth();
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(platipay_schema),
    defaultValues: {
      amount: "",
      status_by_client: "",
      transaction_id: "",
      from: undefined,
      to: undefined,
    },
  });

  const amount = watch("amount");
  const status_by_client = watch("status_by_client");
  const transaction_id = watch("transaction_id");
  const from = watch("from");
  const to = watch("to");

  const [debouncedAmount] = useDebounce(amount, 700);
  const [debouncedStatusByClient] = useDebounce(status_by_client, 700);
  const [debouncedTransactionId] = useDebounce(transaction_id, 700);
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
      platipayThunk({
        page,
        per_page: 20,
        amount: debouncedAmount,
        status_by_client: debouncedStatusByClient,
        transaction_id: debouncedTransactionId,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        sort,
      })
    );
  }, [
    debouncedAmount,
    debouncedStatusByClient,
    debouncedTransactionId,
    debouncedFrom,
    debouncedTo,
    sort,
    page,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };

  const columns = useMemo<IColumn<Platipay>[]>(
    () => [
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("created_at")}</P>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MonthPicker
                  name="from"
                  control={control}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
                <MonthPicker
                  name="to"
                  control={control}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
              </Box>
              {sortComponent()}
            </Box>
          </Box>
        ),
        renderComponent: (row: Platipay) => {
          return (
            <span
              style={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {dayjs(row.created_at).format("DD MMM HH:mm")}
            </span>
          );
        },
      },
      {
        column: "amount",
        currencyManual: " ₽",
        valueKey: "amount",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("amount")}
              name="amount"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "status_order",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("status_by_client")}
              name="status_by_client"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
        renderComponent: (row: Platipay) => {
          return (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: getStatusColor(row.status_by_client ?? "-"),
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.status_by_client && t(row.status_by_client)}
            </span>
          );
        },
      },
      {
        column: "transaction_id",
        valueKey: "transaction_id",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("transaction_id")}
              name="transaction_id"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
    ],
    []
  );
  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40px",
            cursor: "pointer",
          }}
        >
          <ExpandLessIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("DESC")}
          />
        </Box>
      </Box>
    );
  };
  const PartnerProgramSummary = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            {t("done_count")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>{done_count}0</P>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            {t("expired_count")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>
            {expired_count}0
          </P>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            {t("progress_count")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>
            {progress_count}0
          </P>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "1rem",
            }}
          >
            {t("not_gived_count")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>
            {not_gived_count}0
          </P>
        </Box>
      </Box>
    );
  };
  return {
    dispatch,
    platipay,
    PartnerProgramSummary,
    total,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
  };
};
export default usePlatipayService;
