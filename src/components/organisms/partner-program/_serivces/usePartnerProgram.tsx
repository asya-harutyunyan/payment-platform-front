import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createRefOrderThunk,
  generateCodeReferralThunk,
  getReferalsUserThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { ReferralOfUser } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
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

const usePartnerProgram = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fetchAuthUser } = useAuth();

  const [page, setPage] = useState(1);
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);

  const { referralUser, amount_to_pay, total_amount, total, loading } =
    useAppSelector((state) => state.users);

  const { user } = useAuth();

  const { control, handleSubmit } = useForm<TFormData>({
    resolver: zodResolver(createReferralsOrderSchema),
    defaultValues: {
      currency_of_payment: ECurrencyRefOrder.USDT,
    },
  });

  const referralUrl =
    location.href.replace("partner-program", "auth/sign-up/") +
    "?referral_code=" +
    user?.referral?.referral_code;

  useEffect(() => {
    dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
  }, [dispatch, page]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
  };

  const columns = useMemo<IColumn<ReferralOfUser>[]>(
    () => [
      {
        column: "name",
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
      },
      {
        column: "amount",
        valueKey: "amount",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );

  const options = useMemo(
    () => [
      { id: 1, name: ECurrencyRefOrder.RUB, currency: "Картой" },
      { id: 2, name: ECurrencyRefOrder.USDT, currency: "Криптовалютой" },
    ],
    []
  );

  const generateReferalCode = () => {
    dispatch(generateCodeReferralThunk())
      .unwrap()
      .then(() => {
        dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
        fetchAuthUser?.();
      });
  };

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

  const PartnerProgramSummary = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "1rem",
            }}
          >
            {t("amount_to_pay")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>
            {amount_to_pay}₽
          </P>
        </Box>
        <Box
          sx={{ display: "flex", paddingRight: "15px", alignItems: "center" }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",
              paddingLeft: "15px",
              fontSize: "1rem",
            }}
          >
            {t("total_amount")}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>{total_amount}₽</P>
        </Box>
      </Box>
    );
  };
  return {
    referralUser,
    total,
    loading,
    navigate,
    user,
    control,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    onSubmit,
    page,
    options,
    referralUrl,
    isCheckoutFormVisible,
    onCheckoutButtonClick,
  };
};

export default usePartnerProgram;
