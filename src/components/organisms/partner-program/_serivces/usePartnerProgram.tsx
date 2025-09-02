import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCodeReferralThunk,
  getReferalsUserThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { ReferralOfUser } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
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

  const { referralUser, amount_to_pay, total_amount, total, loading } =
    useAppSelector((state) => state.users);

  const { user } = useAuth();

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

  const generateReferalCode = () => {
    dispatch(generateCodeReferralThunk())
      .unwrap()
      .then(() => {
        dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
        fetchAuthUser?.();
      });
  };

  const onCheckoutButtonClick = () => {
    navigate({ to: "/orders-history" });
  };

  const PartnerProgramSummary = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
              paddingLeft: { lg: "15px", md: "15px", xs: "0", sm: "0" },
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
    user,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    page,
    referralUrl,
    onCheckoutButtonClick,
  };
};

export default usePartnerProgram;
