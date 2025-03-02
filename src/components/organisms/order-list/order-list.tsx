import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getOrdersThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const OrderListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, loading } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  useEffect(() => {
    dispatch(
      getOrdersThunk({ page: page, per_page: user?.role === "admin" ? 50 : 5 })
    );
  }, [dispatch, page, user?.role]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getOrdersThunk({ page }));
    console.log(event, page);
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
        currency: "₽ ",
        valueKey: "amount",
      },
      {
        column: "status_by_client",
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
  const navigate = useNavigate();
  const route = useLocation();

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/order-list") {
      navigate({ to: `/order-list/${row}` });
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("order_list")} />
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
