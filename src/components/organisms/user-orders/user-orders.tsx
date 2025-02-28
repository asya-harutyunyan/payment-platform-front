import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmOrderByAdminThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const UserOrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrdersThunk({ page: page }));
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
        valueKey: "amount",
      },
      {
        column: "status_by_admin",
        valueKey: "status_by_admin",
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
        })
        .catch(() => {
          enqueueSnackbar(t("bank_card_added_error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
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
              isUser
              isNeedBtn
              isNeedBtnConfirm
              isNeedBtnConfirmText="confirm"
              columns={columns}
              data={orders}
              handleClick={handleConfirm}
              onChangePage={onChangePage}
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
