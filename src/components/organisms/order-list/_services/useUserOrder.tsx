import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor, StatusOptions } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { order_schema } from "@/schema/order_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import {
  changeStatusDoneOrderThunk,
  deleteOrderThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/orderSlice/thunks";
import { getOrderSummaryThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof order_schema>;

const useAdminOrder = () => {
  const { goToUserPage } = useUserContext();

  const dispatch = useAppDispatch();
  const { orders, total, loading } = useAppSelector((state) => state.order);
  const {
    orderSummary,
    total: reportTotal,
    loading: loadingTotal,
  } = useAppSelector((state) => state.reports);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<number>();
  const [filter, setFilter] = useState<DEPOSIT_STATUSES>(DEPOSIT_STATUSES.ALL);

  useEffect(() => {
    if (user?.permissions.includes("orders_view.summary")) {
      dispatch(getOrderSummaryThunk());
    }
  }, []);

  const navigate = useNavigate();
  const route = useLocation();

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/order-list") {
      navigate({ to: `/order-list/${row}` });
    }
  };
  const handleDeleteModal = (id?: number) => {
    setOpenDeleteModal(true);
    setSelectedOrder(id);
  };
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(order_schema),
    defaultValues: {
      name: "",
      surname: "",
      from: undefined,
      to: undefined,
      status_by_admin: "",
      card_number: "",
      transaction_id: "",
      status_client: "",
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const amount = watch("amount");
  const statusByAdmin = watch("status_client");
  const cardNumber = watch("card_number");
  const from = watch("from");
  const to = watch("to");
  const transaction_id = watch("transaction_id");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedTransactionId] = useDebounce(transaction_id, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedAmount] = useDebounce(amount, 700);
  const [debouncedStatusByAdmin] = useDebounce(statusByAdmin, 700);
  const [debouncedCardNumber] = useDebounce(cardNumber, 700);
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

    const status =
      debouncedStatusByAdmin === "all" ? "" : debouncedStatusByAdmin;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page,
          per_page: 50,
          status_by_client: filter,
          name: debouncedName,
          surname: debouncedSurname,
          amount: debouncedAmount,
          status_client: status,
          card_number: debouncedCardNumber,
          transaction_id: debouncedTransactionId,
          to: isValidRange ? debouncedTo : "",
          from: isValidRange ? debouncedFrom : "",
          sort,
        })
      );
    };

    fetchOrders();
    // const interval = setInterval(fetchOrders, 10000);

    // return () => clearInterval(interval);
  }, [
    debouncedAmount,
    debouncedName,
    debouncedSurname,
    debouncedStatusByAdmin,
    debouncedCardNumber,
    debouncedTransactionId,
    debouncedFrom,
    debouncedTo,
    sort,
    filter,
    page,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };
  const handleChangeDone = (id?: number) => {
    if (id) {
      dispatch(changeStatusDoneOrderThunk(id))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("success_change_order"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });

          dispatch(
            getOrdersThunk({
              page,
              per_page: 50,
            })
          );
        })
        .catch((error) => {
          if (error === "Невозможно удалить заказ со статусом «Выполнено»") {
            enqueueSnackbar("Невозможно удалить заказ со статусом «Успешно»", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          } else {
            enqueueSnackbar(t("error"), {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
        });
    }
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
                    width="130px"
                    name="from"
                    control={control}
                    onOpen={() => setIsDatePickerOpen(true)}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                  <MonthPicker
                    width="130px"
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
                width="130px"
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
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          renderComponent: (row: Order) => {
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
                  name="status_client"
                  control={control}
                  options={StatusOptions}
                  height="43px"
                />
              </Box>
            );
          },
        },
        user?.permissions.includes("orders_delete")
          ? {
              column: "key",
              renderComponent: (row: Order) => {
                return (
                  row.status_by_client !== "done" && (
                    <Button
                      variant={"error"}
                      text={"Удалить"}
                      sx={{ width: "130px" }}
                      onClick={() => handleDeleteModal?.(row.id)}
                    />
                  )
                );
              },
            }
          : null,
        {
          renderComponent: (row: Order) => {
            return (
              <Button
                variant={"outlined"}
                text={t("see_more")}
                sx={{ width: "130px" }}
                onClick={() => handleSingleOrder?.(row.id)}
              />
            );
          },
        },
        {
          column: "key",
          renderComponent: (row: Order) => {
            return (
              row.status_by_client === "expired" && (
                <Button
                  variant={"outlined"}
                  text={"Изменить: Выполнено"}
                  sx={{ width: "200px" }}
                  onClick={() => handleChangeDone?.(row.id)}
                />
              )
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
                width="130px"
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
                width="130px"
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
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
      ].filter(Boolean) as IColumn<Order>[],
    [control, user?.permissions]
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
            paddingTop: "8px",
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

  const handleDeleteOrder = () => {
    if (selectedOrder) {
      dispatch(deleteOrderThunk(selectedOrder))
        .unwrap()
        .then(() => {
          setSelectedOrder(undefined);
          setOpenDeleteModal(false);
          enqueueSnackbar(t("success_delete_order"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(
            getOrdersThunk({
              page: page,
              per_page: 50,
              status_by_client: filter,
            })
          );
        })
        .catch((error) => {
          if (error === "Невозможно удалить заказ со статусом «Выполнено»") {
            enqueueSnackbar("Невозможно удалить заказ со статусом «Успешно»", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          } else {
            enqueueSnackbar(t("error"), {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          }
          setSelectedOrder(undefined);
          setOpenDeleteModal(false);
        });
    }
  };
  const handleFilterChange = (
    _: React.SyntheticEvent,
    filter: DEPOSIT_STATUSES
  ) => {
    setFilter(filter);
    dispatch(
      getOrdersThunk({
        page: page,
        per_page: 50,
        status_by_client: filter,
      })
    );
  };
  const OrderSummary = () => {
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
            alignItems: "center",
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",
              fontSize: "0.9rem",
            }}
          >
            Количество активных карт:
          </P>
          <P sx={{ fontSize: "0.9rem", paddingLeft: "5px" }}>
            {orderSummary.active_cards}
          </P>
        </Box>
        <Box sx={{ display: "flex", paddingRight: "15px" }}>
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "0.9rem",
            }}
          >
            Сумма, залитая на карты:
          </P>
          <P sx={{ fontSize: "0.9rem", paddingLeft: "5px" }}>
            {orderSummary.deposited_amounts}₽
          </P>
        </Box>
        <Box sx={{ display: "flex", paddingRight: "15px" }}>
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "0.9rem",
            }}
          >
            Полученная сумма:
          </P>
          <P sx={{ fontSize: "0.9rem", paddingLeft: "5px" }}>
            {orderSummary.expiredAmount}₽
          </P>
        </Box>
        <Box sx={{ display: "flex", paddingRight: "15px" }}>
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "0.9rem",
            }}
          >
            Количество истекших:
          </P>
          <P sx={{ fontSize: "0.9rem", paddingLeft: "5px" }}>
            {orderSummary.expiredCount}
          </P>
        </Box>

        <Box sx={{ display: "flex", paddingRight: "15px" }}>
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "0.9rem",
            }}
          >
            Ожидаемая сумма:
          </P>
          <P sx={{ fontSize: "0.9rem", paddingLeft: "5px" }}>
            {orderSummary.not_deposited_yet_amount}₽
          </P>
        </Box>
      </Box>
    );
  };
  return {
    orders,
    total,
    reportTotal,
    loadingTotal,
    loading,
    page,
    setPage,
    openDeleteModal,
    setOpenDeleteModal,
    selectedOrder,
    setSelectedOrder,
    filter,
    setFilter,
    onChangePage,
    columns,
    orderSummary,
    navigate,
    route,
    handleDeleteOrder,
    handleFilterChange,
    OrderSummary,
    user,
  };
};

export default useAdminOrder;
