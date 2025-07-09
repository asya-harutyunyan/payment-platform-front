import Button from "@/components/atoms/button";
import { TColumn } from "@/components/molecules/table";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  cancelReferralsOrdersThunk,
  createRefOrderThunk,
  getReferralsOrdersThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { TGetReferralsOrdersThunkResponse } from "@/store/reducers/allUsersSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type TFormData = z.infer<typeof createReferralsOrderSchema>;

export enum ECurrencyRefOrder {
  RUB = "RUB",
  USDT = "USDT",
}

const useOrdersHistory = () => {
  const dispatch = useAppDispatch();

  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);
  const userReferralsData = useAppSelector(
    (state) => state.users.getUserReferralsOrdersState.data?.orders ?? []
  );

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(createReferralsOrderSchema),
    defaultValues: { currency_of_payment: ECurrencyRefOrder.USDT },
  });

  useEffect(() => {
    const initData = async () => {
      try {
        await dispatch(getReferralsOrdersThunk()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    initData();
  }, [dispatch]);

  const columns = useMemo(
    () =>
      [
        { column: t("currency"), valueKey: "currency_of_payment" },
        { column: t("id"), valueKey: "id" },
        { column: t("amount"), valueKey: "request_amount" },
        { column: t("status"), valueKey: "payment_status" },
        { column: t("wallet"), valueKey: "transaction_hash" },
        {
          column: "",
          renderComponent: (row) => (
            <Button
              variant="contained"
              text={t("cancel")}
              onClick={async () => {
                try {
                  const res = await dispatch(
                    cancelReferralsOrdersThunk({ id: row.id })
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
      ] as TColumn<
        TGetReferralsOrdersThunkResponse["data"]["orders"][number]
      >[],
    []
  );

  const options = useMemo(
    () => [
      { id: 1, name: ECurrencyRefOrder.RUB, currency: "Картой" },
      { id: 2, name: ECurrencyRefOrder.USDT, currency: "Криптовалютой" },
    ],
    []
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(createRefOrderThunk(data)).unwrap();
      enqueueSnackbar(
        "Ваш запрос находится на обработке! Пожалуйста подождите.",
        {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  const onCheckoutButtonClick = () => {
    setIsCheckoutFormVisible(true);
  };

  return {
    control,
    columns,
    onSubmit,
    options,
    isCheckoutFormVisible,
    onCheckoutButtonClick,
    userReferralsData,
  };
};

export default useOrdersHistory;
