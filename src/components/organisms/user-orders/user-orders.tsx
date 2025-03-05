import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmOrderByClientThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const UserOrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getOrdersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getOrdersThunk({ page: page, per_page: 5 }));
    }
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getOrdersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getOrdersThunk({ page: page, per_page: 5 }));
    }
  };
  const columns = useMemo<IColumn<Order>[]>(
    () => [
      {
        column: "amount",
        currency: "wallet_deposit.order_currency",
        valueKey: "amount",
      },
      {
        column: "order_status",
        valueKey: "status_by_client",
      },
      {
        column: "id",
        valueKey: "transaction_id",
      },
      {
        column: "card_number",
        valueKey: "user.bank_details.card_number",
      },
      {
        column: "key",
        button: "statuses",
      },
    ],
    []
  );
  const handleConfirm = (num?: number) => {
    if (num) {
      dispatch(confirmOrderByClientThunk(num))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("confirm_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          if (user?.role === "client") {
            dispatch(getOrdersThunk({ page, per_page: 5 }));
          } else {
            dispatch(getOrdersThunk({ page, per_page: 20 }));
          }
        })
        .catch(() => {
          enqueueSnackbar(t("bank_card_added_error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  const navigate = useNavigate();
  const route = useLocation();

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/orders") {
      navigate({ to: `/orders/${row}` });
    }
  };

  const refetch = () => {
    if (user?.role === "admin") {
      dispatch(getOrdersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getOrdersThunk({ page: page, per_page: 5 }));
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("orders")} />
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
              {" "}
              <PaginationOutlined
                page={page}
                onPageChange={onChangePage}
                count={total}
              />
            </Box>
          </Box>
        ) : (
          <EmptyComponent
            text={"empty_order"}
            isTextNeeded={"order_empty_text"}
          />
        )}
      </Box>
    </Box>
  );
};
