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

export const UserOrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  useEffect(() => {
    dispatch(
      getOrdersThunk({ page: page, per_page: user?.role === "admin" ? 50 : 5 })
    );
  }, []);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getOrdersThunk({ page }));
    console.log(event);
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
        column: "type",
        valueKey: "type",
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
      dispatch(confirmOrderByAdminThunk(num))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("confirm_success"), {
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
  const navigate = useNavigate();
  const route = useLocation();

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/orders") {
      navigate({ to: `/orders/${row}` });
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("orders")} />
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
          overflowX: "auto",
        }}
      >
        {loading ? (
          <CircularIndeterminate />
        ) : orders.length > 0 ? (
          <Box
            sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
          >
            <DynamicTable
              columns={columns}
              data={orders}
              handleClick={handleConfirm}
              onChangePage={onChangePage}
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
