import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { useAppDispatch, useAppSelector } from "@/store";

import { Order } from "@/store/reducers/user-info/depositSlice/types";
import {
  confirmOrderByClientThunk,
  getUserOrdersThunk,
} from "@/store/reducers/user-info/orderSlice/thunks";
import { P } from "@/styles/typography";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { ADMIN_ROLES } from "../../auth/sign-in-form/_services/useSignIn";

type ICountdownRendererFn = (
  props: CountdownRenderProps,
  id?: number
) => React.ReactNode;

const useUserOrder = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<DEPOSIT_STATUSES>(DEPOSIT_STATUSES.ALL);
  const { ordersUser, loading, total } = useAppSelector((state) => state.order);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [addId, setAddId] = useState<number | null>(null);
  const navigate = useNavigate();
  const route = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.role) return;

    const fetchOrders = () => {
      dispatch(
        getUserOrdersThunk({
          page: page,
          per_page:
            ADMIN_ROLES.includes(user.role as (typeof ADMIN_ROLES)[number]) ||
            user.role === "superAdmin"
              ? 20
              : 5,
          status_by_client: filter,
        })
      );
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, [dispatch, page, user?.role, filter]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleOpen = () => setOpen(true);

  const getTimer = (created_at: string) => {
    const duration = 20;
    return new Date(
      dayjs()
        .add(
          (dayjs(created_at).add(duration, "minutes").unix() - dayjs().unix()) *
            1000,
          "milliseconds"
        )
        .format()
    );
  };

  const countDownrenderer: ICountdownRendererFn = (
    { completed, formatted },
    id
  ) => {
    if (!completed)
      return (
        <Button
          variant="contained"
          sx={{ fontSize: "0.7rem", width: "140px" }}
          onClick={() => {
            handleOpen();
            if (id) {
              setAddId(id);
            }
          }}
          text={`Подтвердить - ${formatted.minutes}:${formatted.seconds}`}
        />
      );
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
            <P sx={{ width: "120px" }}>
              <Countdown
                date={getTimer(row.created_at)}
                renderer={(props) => countDownrenderer(props, row.id)}
              />
            </P>
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
        renderComponent: (row: Order) => (
          <Button
            variant="outlined"
            text={t("see_more")}
            sx={{ width: "130px" }}
            onClick={() => handleSingleOrder(row.id)}
          />
        ),
      },
    ],
    [user]
  );

  const handleFilterChange = (
    _: React.SyntheticEvent,
    filter: DEPOSIT_STATUSES
  ) => {
    setFilter(filter);
    dispatch(
      getUserOrdersThunk({
        page,
        per_page:
          ADMIN_ROLES.includes(user?.role as (typeof ADMIN_ROLES)[number]) ||
          user?.role === "superAdmin"
            ? 20
            : 5,
        status_by_client: filter,
      })
    );
  };

  const handleConfirm = (num?: number) => {
    if (!num) return;

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
        dispatch(
          getUserOrdersThunk({
            page,
            per_page: user?.role === "client" ? 5 : 20,
          })
        );
        setOpen(false);
      })
      .catch(() => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOpen(false);
      });
  };

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/orders" && row) {
      navigate({ to: `/orders/${row}` });
    }
  };

  return {
    filter,
    setFilter,
    ordersUser,
    loading,
    total,
    page,
    setPage,
    open,
    setOpen,
    addId,
    setAddId,
    onChangePage,
    handleOpen,
    getTimer,
    handleConfirm,
    columns,
    handleFilterChange,
  };
};

export default useUserOrder;
