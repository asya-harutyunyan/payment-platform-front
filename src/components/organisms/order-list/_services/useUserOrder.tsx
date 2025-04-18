import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  deleteOrderThunk,
  getOrdersThunk,
  getOrderSummaryThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";

const useAdminOrder = () => {
  const dispatch = useAppDispatch();
  const { orders, total, loading, orderSummary } = useAppSelector(
    (state) => state.deposit
  );
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<number>();
  const [filter, setFilter] = useState<DEPOSIT_STATUSES>(DEPOSIT_STATUSES.ALL);
  useEffect(() => {
    dispatch(getOrderSummaryThunk());
  }, [dispatch]);

  const { user } = useAuth();
  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page,
          per_page: 5,
          status_by_client: filter,
        })
      );
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, [dispatch, filter, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(
      getOrdersThunk({ page: page, per_page: 5, status_by_client: filter })
    );
  };
  const columns = useMemo<IColumn<Order>[]>(
    () => [
      {
        column: "name",
        valueKey: "user.name",
      },
      {
        column: "surname",
        valueKey: "user.surname",
      },
      {
        column: "key",
        renderComponent: (row: Order) => {
          return (
            <Button
              variant={"error"}
              text={"Удалить"}
              sx={{ width: "130px" }}
              onClick={() => handleDeleteModal?.(row.id)}
            />
          );
        },
      },
      {
        column: "key",
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
        column: "amount_order",
        currency: "wallet_deposit.order_currency",
        valueKey: "amount",
      },
      {
        column: "order_status_admin",
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
      },
      {
        column: "card_number",
        valueKey: "wallet_deposit.payment_method.card_number",
      },
    ],
    []
  );
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
            enqueueSnackbar(
              "Невозможно удалить заказ со статусом «Выполнено»",
              {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              }
            );
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
        per_page: 5,
        status_by_client: filter,
      })
    );
  };
  return {
    orders,
    total,
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
  };
};

export default useAdminOrder;
