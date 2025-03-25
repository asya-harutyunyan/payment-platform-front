import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmOrderByAdminThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const OrderListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, loading } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page,
          per_page: user.role === "admin" ? 50 : 5,
        })
      );
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 20000);

    return () => clearInterval(interval);
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getOrdersThunk({ page: page, per_page: 50 }));
    } else {
      dispatch(getOrdersThunk({ page: page, per_page: 5 }));
    }
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
        column: "amount_order",
        currency: "wallet_deposit.order_currency",
        valueKey: "amount",
      },
      {
        column: "order_status_admin",
        valueKey: "status_by_admin",
      },
      {
        column: "id",
        valueKey: "transaction_id",
      },
      {
        column: "card_number",
        valueKey: "wallet_deposit.payment_method.card_number",
      },
      {
        column: "left_amount",
        valueKey: "wallet_deposit.processing_amount",
      },
      {
        column: "key",
        button: "statuses",
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

  const handleConfirm = (num?: number) => {
    if (num) {
      dispatch(confirmOrderByAdminThunk(num))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("confirm_order_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getOrdersThunk({ page }));
        })
        .catch(() => {
          enqueueSnackbar(t("bank_card_added_error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };

  const refetch = () => {
    if (user?.role === "admin") {
      dispatch(getOrdersThunk({ page: page, per_page: 50 }));
    } else {
      dispatch(getOrdersThunk({ page: page, per_page: 5 }));
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("order_list")} />
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
        }}
      >
        {loading ? (
          <CircularIndeterminate />
        ) : orders.length > 0 ? (
          <Box
            sx={{
              width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <DynamicTable
              columns={columns}
              data={orders}
              handleClick={handleConfirm}
              onChangePage={onChangePage}
              refetchData={refetch}
              handleClickBtn={handleSingleOrder}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </Box>
        ) : (
          <EmptyComponent text={"empty_order_admin"} />
        )}
      </Box>
    </Box>
  );
};
