import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { StatusOptions } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { deleted_order_schema } from "@/schema/order_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { getDeletedOrdersThunk } from "@/store/reducers/user-info/orderSlice/thunks";
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

type FormData = z.infer<typeof deleted_order_schema>;

const useDeletedOrders = () => {
  const { deletedOrders, total, loading } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { user } = useAuth();
  const { goToUserPage } = useUserContext();
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(deleted_order_schema),
    defaultValues: {
      name: "",
      surname: "",
      from: undefined,
      to: undefined,
      status_by_client: "",
      transaction_id: "",
      amount: "",
      card_number: "",
    },
  });
  const name = watch("name");
  const surname = watch("surname");
  const statusByClient = watch("status_by_client");
  const from = watch("from");
  const to = watch("to");
  const transaction_id = watch("transaction_id");
  const amount = watch("amount");
  const card_number = watch("card_number");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedTransactionId] = useDebounce(transaction_id, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedStatusByClient] = useDebounce(statusByClient, 700);
  const [debouncedAmount] = useDebounce(amount, 700);
  const [debouncedCardNumber] = useDebounce(card_number, 700);
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
      getDeletedOrdersThunk({
        page,
        per_page: 2,
        name: debouncedName,
        surname: debouncedSurname,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        transaction_id: debouncedTransactionId,
        status_by_client: debouncedStatusByClient,
        amount: debouncedAmount,
        card_number: debouncedCardNumber,
        sort,
      })
    );
  }, [
    sort,
    page,
    debouncedFrom,
    debouncedTo,
    debouncedName,
    debouncedSurname,
    debouncedTransactionId,
    debouncedStatusByClient,
    debouncedAmount,
    debouncedCardNumber,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };

  const columns = useMemo<IColumn<Order>[]>(
    () =>
      [
        {
          renderComponent: (row: Order) => {
            return (
              <span
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
              </span>
            );
          },
          column: () => (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {t("sort_by_created_at")}
              </P>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        },
        {
          column: "name",
          renderComponent: (row: Order) => {
            return (
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => goToUserPage(row.id)}
              >
                {row?.user?.name}
              </P>
            );
          },
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="name"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "surname",
          valueKey: "user.surname",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="surname"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          valueKey: "status_by_client",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("order_status_client")}
                </P>
                <SelectFieldWith
                  placeholder={""}
                  name="status_by_client"
                  control={control}
                  options={StatusOptions}
                  height="43px"
                />
              </Box>
            );
          },
        },

        {
          column: "amount_order",
          currency: "wallet_deposit.order_currency",
          valueKey: "amount",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="amount"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },

        {
          column: "id",
          valueKey: "transaction_id",
          renderComponent: (row: Order) => {
            return (
              row.transaction_id && (
                <CopyButton text={row.transaction_id} color={"#7d7d7d"} />
              )
            );
          },
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="transaction_id"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "card_number",
          valueKey: "wallet_deposit.payment_method.card_number",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="card_number"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
      ].filter(Boolean) as IColumn<Order>[],
    [user?.permissions]
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

  return {
    dispatch,
    deletedOrders,
    total,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
  };
};
export default useDeletedOrders;
