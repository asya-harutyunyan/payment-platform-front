import Button from "@/components/atoms/button";
import { TColumn } from "@/components/molecules/table";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  cancelReferralsOrdersThunk,
  createRefOrderThunk,
  getReferalsUserThunk,
  getReferralsOrdersThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { TGetReferralsOrdersThunkResponse } from "@/store/reducers/allUsersSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
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
  const { total_amount } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getReferalsUserThunk({ page: 1, per_page: 5 }));
  }, []);

  const { control, handleSubmit, setError } = useForm<TFormData>({
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
        {
          column: "currency",
          valueKey: "currency_of_payment",
        },
        {
          column: "id",
          valueKey: "id",
        },
        {
          column: "amount",
          valueKey: "request_amount",
        },
        {
          column: "status",
          renderComponent: (row) => {
            return (
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {t(row.payment_status)}
              </P>
            );
          },
        },
        {
          column: "wallet",
          renderComponent: (row) => {
            return (
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {row.transaction_hash ? t(row.transaction_hash) : "-"}
              </P>
            );
          },
        },
        {
          column: "key",
          renderComponent: (row) => (
            <Box>
              {row.payment_status === "open" ? (
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
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                          },
                        });
                      }
                    } catch (error) {
                      console.log(error);

                      if (typeof error === "string") {
                        enqueueSnackbar(error, {
                          variant: "error",
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                          },
                        });
                      }
                    }
                  }}
                />
              ) : null}
            </Box>
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
    if (total_amount === 0) {
      setError("request_amount", {
        type: "manual",
        message: "У вас недостаточно средств на балансе для выполнения вывода.",
      });
      return;
    } else {
      dispatch(createRefOrderThunk(data))
        .unwrap()
        .then(() => {
          enqueueSnackbar(
            "Ваш запрос находится на обработке! Пожалуйста подождите.",
            {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            }
          );
        })
        .catch((error) => {
          // if (
          //   error ===
          //   "У вас уже есть открытая заявка на сумму 7526.00. Ваш текущий заработок: 7836. Вы можете запросить не более 310."
          // ) {
          //   enqueueSnackbar(error, {
          //     variant: "error",
          //     anchorOrigin: { vertical: "top", horizontal: "right" },
          //   });
          // } else {
          enqueueSnackbar(error, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          // }
        });
    }
  });

  const onCheckoutButtonClick = () => {
    setIsCheckoutFormVisible(true);
  };

  return {
    control,
    columns,
    onSubmit,
    setError,
    options,
    isCheckoutFormVisible,
    onCheckoutButtonClick,
    userReferralsData,
  };
};

export default useOrdersHistory;
