import bg from "@/assets/images/modal.png";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";

import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import DynamicTable from "@/components/molecules/table-new";
import { getStatusColor } from "@/components/utils/status-color";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmOrderByClientThunk,
  getOrdersThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { H3, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { EmptyComponent } from "../empty-component";

type ICountdownRendererFn = (
  props: CountdownRenderProps,
  id?: number
) => React.ReactNode;

export const UserOrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  // const [filter, setFilter] = useState<DEPOSIT_STATUSES>(DEPOSIT_STATUSES.ALL);
  const { orders, loading, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [addId, setAddId] = useState<number | null>(null);

  const { user } = useAuth();
  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getOrdersThunk({
          page: page,
          per_page: user.role === "admin" ? 20 : 5,
          // status_by_client: DEPOSIT_STATUSES.ALL,
        })
      );
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);

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
  const handleOpen = () => setOpen(true);
  const getTimer = (created_at: string, type?: "CRYPTO" | "FIAT") => {
    if (type) {
      if (type === "CRYPTO") {
        return new Date(
          dayjs()
            .add(
              (dayjs(created_at).add(15, "minutes").unix() - dayjs().unix()) *
                1000,
              "milliseconds"
            )
            .format()
        );
      }

      return new Date(
        dayjs()
          .add(
            (dayjs(created_at).add(40, "minutes").unix() - dayjs().unix()) *
              1000,
            "milliseconds"
          )
          .format()
      );
    }
    return new Date(
      dayjs()
        .add(
          (dayjs(created_at).add(15, "minutes").unix() - dayjs().unix()) * 1000,
          "milliseconds"
        )
        .format()
    );
  };
  const countDownrenderer: ICountdownRendererFn = (
    { completed, formatted },
    id?: number
  ) => {
    if (completed) {
      return <H6 color="primary.main">Не оплачен</H6>;
    } else {
      return (
        <Button
          variant={"contained"}
          sx={{ fontSize: "0.7rem", width: "140px" }}
          onClick={() => {
            handleOpen();
            if (id) {
              setAddId(id);
            }
          }}
          text={`Подтвердить- ${formatted.minutes}:
          ${formatted.seconds}`}
        ></Button>
      );
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
        renderComponent: (row: Order) => {
          return row.status_by_client === "pending" ? (
            <>
              {" "}
              <P
                sx={{
                  width: "120px",
                }}
              >
                <Countdown
                  date={getTimer(row.created_at as string, "FIAT")}
                  renderer={(props) => {
                    return countDownrenderer(props, row.id);
                  }}
                />
              </P>
            </>
          ) : (
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

  // const refetch = () => {
  //   if (user?.role === "admin") {
  //     dispatch(
  //       getOrdersThunk({
  //         page: page,
  //         per_page: 20,
  //         // status_by_client: DEPOSIT_STATUSES.ALL,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       getOrdersThunk({
  //         page: page,
  //         per_page: 5,
  //         // status_by_client: DEPOSIT_STATUSES.ALL,
  //       })
  //     );
  //   }
  // };

  // const handleFilterChange = (
  //   _: React.SyntheticEvent,
  //   filter: DEPOSIT_STATUSES
  // ) => {
  //   setFilter(filter);
  //   if (user?.role === "admin") {
  //     dispatch(
  //       getOrdersThunk({
  //         page: page,
  //         per_page: 20,
  //         status_by_client: filter,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       getOrdersThunk({
  //         page: page,
  //         per_page: 5,
  //         status_by_client: filter,
  //       })
  //     );
  //   }
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("orders")} />
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
        }}
      >
        {/* <Tabs
          value={filter}
          onChange={handleFilterChange}
          sx={{ color: "black", backgroundColor: "#f6f6f6" }}
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
        </Tabs> */}
        {loading ? (
          <CircularIndeterminate />
        ) : orders.length > 0 ? (
          <Box
            sx={{
              width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
              height: "100vh",
            }}
          >
            <DynamicTable columns={columns} data={orders} />

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
          {t("deposit_confirm_text")}
        </H3>
        <Button
          variant={"outlinedWhite"}
          sx={{ fontSize: "0.7rem", marginTop: "20px" }}
          onClick={() => {
            if (addId) {
              handleConfirm(addId);
            }
          }}
          text={t("confirm")}
        />
      </BasicModal>
    </Box>
  );
};
