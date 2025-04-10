import bg from "@/assets/images/modal.png";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";

import Button from "@/components/atoms/button";
// import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import {
  confirmOrderByAdminThunk,
  deleteOrderThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { H3 } from "@/styles/typography";
import { Box, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const OrderListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, loading } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<number>();
  const [filter, setFilter] = useState<DEPOSIT_STATUSES>(DEPOSIT_STATUSES.ALL);

  const { user } = useAuth();
  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page,
          per_page: user.role === "admin" ? 50 : 5,
          status_by_client: filter,
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
      dispatch(
        getOrdersThunk({ page: page, per_page: 50, status_by_client: filter })
      );
    } else {
      dispatch(
        getOrdersThunk({ page: page, per_page: 5, status_by_client: filter })
      );
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
        column: "key",
        button: "statuses",
      },
      {
        column: "key",
        button: "delete_order",
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
          dispatch(
            getOrdersThunk({
              page: page,
              per_page: 50,
              status_by_client: filter,
            })
          );
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };

  const refetch = () => {
    if (user?.role === "admin") {
      dispatch(
        getOrdersThunk({ page: page, per_page: 50, status_by_client: filter })
      );
    } else {
      dispatch(
        getOrdersThunk({ page: page, per_page: 5, status_by_client: filter })
      );
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
          dispatch(getOrdersThunk({ page: page, per_page: 50 }));
        })
        .catch(() => {
          setSelectedOrder(undefined);
          setOpenDeleteModal(false);
          enqueueSnackbar(t("error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  const handleFilterChange = (
    _: React.SyntheticEvent,
    filter: DEPOSIT_STATUSES
  ) => {
    setFilter(filter);
    if (user?.role === "admin") {
      dispatch(
        getOrdersThunk({
          page: page,
          per_page: 20,
          status_by_client: filter,
        })
      );
    } else {
      dispatch(
        getOrdersThunk({
          page: page,
          per_page: 5,
          status_by_client: filter,
        })
      );
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
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          sx={{ color: "black", backgroundColor: "#f6f6f6", width: "90%" }}
        >
          <Tab
            label="Все"
            value={DEPOSIT_STATUSES.ALL}
            sx={{ color: "black" }}
          />
          <Tab
            label="Неподтвержденные"
            value={DEPOSIT_STATUSES.PENDING}
            sx={{ color: "black" }}
          />
          <Tab
            label="Успешные"
            value={DEPOSIT_STATUSES.DONE}
            sx={{ color: "black" }}
          />
          <Tab
            label="Просроченные"
            value={DEPOSIT_STATUSES.EXPRIED}
            sx={{ color: "black" }}
          />
        </Tabs>
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
              handleDeleteOrder={handleDeleteModal}
              onChangePage={onChangePage}
              refetchData={refetch}
              handleSinglePage={handleSingleOrder}
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
      <BasicModal
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        bg={bg}
        width="50%"
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
          {t("delete_order_modal")}
        </H3>
        <Box
          sx={{
            display: "flex",
            width: {
              lg: "30%",
              md: "30%",
              xs: "100%",
              sm: "100%",
            },
            justifyContent: "space-between",
            flexDirection: {
              lg: "row",
              md: "row",
              xs: "column",
              sm: "column",
            },
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setOpenDeleteModal(false)}
            sx={{
              marginBottom: {
                lg: "0",
                md: "0",
                xs: "10px",
                sm: "10px",
              },
            }}
          />
          <Button
            variant={"text"}
            text={t("yes")}
            onClick={() => handleDeleteOrder()}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};
