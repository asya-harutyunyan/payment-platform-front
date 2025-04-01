import bg from "@/assets/images/modal.png";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";

import { BasicModal } from "@/components/atoms/modal";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmOrderByClientThunk,
  deleteOrderThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { H3 } from "@/styles/typography";
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
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useAuth();
  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page: page,
          per_page: user.role === "admin" ? 20 : 5,
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
        column: "order_status_user",
        valueKey: "status_by_client",
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
        currency: "wallet_deposit.order_currency",
        valueKey: "wallet_deposit.processing_amount",
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
        .then((data) => {
          if (data.is_final) {
            setOpen(true);
          }
          enqueueSnackbar(t("confirm_order_success"), {
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
          enqueueSnackbar(t("something_went_wrong"), {
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
  const handleDeleteOrder = (id?: number) => {
    if (id) {
      dispatch(deleteOrderThunk(id))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("success_delete_order"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getOrdersThunk({ page: page, per_page: 5 }));
        })
        .catch(() => {
          enqueueSnackbar(t("error"), {
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
        }}
      >
        {loading ? (
          <CircularIndeterminate />
        ) : orders.length > 0 ? (
          <Box
            sx={{
              width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
              height: "100vh",
              // overflowY: "auto",
            }}
          >
            <DynamicTable
              columns={columns}
              data={orders}
              handleClick={handleConfirm}
              onChangePage={onChangePage}
              refetchData={refetch}
              handleDeleteOrder={handleDeleteOrder}
              handleSinglePage={handleSingleOrder}
              confirmText={"order_confirm_text"}
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
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
        minHeight="200px"
      >
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("left_amount_done")}
        </H3>
      </BasicModal>
    </Box>
  );
};
