import Button from "@/components/atoms/button";
import { TColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  acceptReferralOrderThunk,
  getReferralOrdersThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { TGetReferralOrdersResponse } from "@/store/reducers/allUsersSlice/types";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";

type TDataItem = TGetReferralOrdersResponse["data"][number];
type TOrderDataItem = TDataItem["orders"][number] & { created_at?: string };

const INITIAL_STATE = { data: [], userId: null };

const useOrdersForRefound = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const referralOrdersData =
    useAppSelector((state) => state.users.getReferralOrdersState.data) ?? [];

  const [currentOrdersData, setCurrentOrdersData] = useState<{
    data: TDataItem["orders"];
    userId: number | null;
  }>(INITIAL_STATE);

  useEffect(() => {
    const initData = async () => {
      try {
        await dispatch(getReferralOrdersThunk()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    initData();
  }, [dispatch, user?.permissions]);

  const onModalClose = () => {
    setCurrentOrdersData(INITIAL_STATE);
  };

  const columns = useMemo(
    () =>
      [
        { column: t("id"), valueKey: "user.id" },
        {
          column: t("orders_count"),
          renderComponent: (row) => <>{row.orders.length}</>,
        },
        { column: t("email"), valueKey: "user.email" },
        { column: t("name"), valueKey: "user.name" },
        {
          column: "",
          renderComponent: (row) => (
            <Button
              variant="contained"
              disabled={
                !row.orders.some(
                  (refOrder) => refOrder.payment_status !== "closed"
                )
              }
              text={t("confirm")}
              onClick={() => {
                setCurrentOrdersData({ data: row.orders, userId: row.user.id });
              }}
            />
          ),
        },
      ] as TColumn<TDataItem>[],
    []
  );

  const ordersColumns = useMemo<TColumn<TOrderDataItem>[]>(
    () => [
      { column: t("id") as keyof TOrderDataItem, valueKey: "id" },
      {
        column: t("amount") as keyof TOrderDataItem,
        valueKey: "request_amount",
      },
      {
        column: t("currency") as keyof TOrderDataItem,
        valueKey: "currency_of_payment",
      },
      {
        column: t("payment_method_id") as keyof TOrderDataItem,
        valueKey: "payment_method",
      },
      {
        column: t("wallet") as keyof TOrderDataItem,
        valueKey: "transaction_hash",
      },
      {
        column: t("status") as keyof TOrderDataItem,
        valueKey: "payment_status",
      },
      {
        column: () =>
          currentOrdersData.data.some(
            (refOrder) => refOrder.payment_status !== "closed"
          ) ? (
            <Button
              variant="contained"
              text={t("confirm_all")}
              onClick={async () => {
                try {
                  if (!currentOrdersData.userId) {
                    return;
                  }

                  const res = await dispatch(
                    acceptReferralOrderThunk({
                      user_id: currentOrdersData.userId,
                    })
                  ).unwrap();
                  await dispatch(getReferralOrdersThunk()).unwrap();
                  setCurrentOrdersData(INITIAL_STATE);

                  if (typeof res === "string") {
                    enqueueSnackbar(res, {
                      variant: "success",
                      anchorOrigin: { vertical: "top", horizontal: "right" },
                    });
                  }
                } catch (error) {
                  console.log(error);

                  if (typeof error === "string") {
                    enqueueSnackbar(error, {
                      variant: "error",
                      anchorOrigin: { vertical: "top", horizontal: "right" },
                    });
                  }
                }
              }}
            />
          ) : null,

        renderComponent: (row) => (
          <Button
            variant="contained"
            disabled={row.payment_status === "closed"}
            text={t("confirm")}
            onClick={async () => {
              try {
                const res = await dispatch(
                  acceptReferralOrderThunk({ referral_order_id: row.id })
                ).unwrap();

                if (typeof res === "string") {
                  enqueueSnackbar(res, {
                    variant: "success",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                  });
                }
              } catch (error) {
                console.log(error);

                if (typeof error === "string") {
                  enqueueSnackbar(error, {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                  });
                }
              }
            }}
          />
        ),
      },
    ],
    [dispatch, currentOrdersData]
  );

  return {
    currentOrdersData,
    onModalClose,
    columns,
    user,
    referralOrdersData,
    ordersColumns,
  };
};

export default useOrdersForRefound;
