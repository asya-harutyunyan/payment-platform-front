import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { gen_code_type_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCodeReferralThunk,
  getReferalsUserThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { ReferralOfUser } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof gen_code_type_schema>;

const usePartnerProgram = () => {
  const { referralUser, amount_to_pay, total_amount, total, loading } =
    useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [paymentType, setPaymentType] = useState(false);
  const { user } = useAuth();
  const { control, watch, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(gen_code_type_schema),
    defaultValues: {
      type: "",
      payment_method_id: "",
      transaction_id: "",
    },
  });
  const selectedType = watch("type");

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
  const { fetchAuthUser } = useAuth();

  const generateReferalCode = () => {
    dispatch(generateCodeReferralThunk())
      .unwrap()
      .then(() => {
        dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
        fetchAuthUser?.();
      });
  };

  useEffect(() => {
    dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
  }, [dispatch, page]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    // setPaymentType(false);
  };

  const options = [
    { id: 1, name: "FIAT", currency: "Картой" },
    { id: 2, name: "CRYITO", currency: "Криптовалютой" },
  ];
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
            paddingRight: "15px",
          }}
        >
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

              fontSize: "1rem",
            }}
          >
            {t(amount_to_pay)}:
          </P>
          <P sx={{ fontSize: "0.8rem", paddingLeft: "5px" }}>{amount_to_pay}</P>
        </Box>
        <Box sx={{ display: "flex", paddingRight: "15px" }}>
          <P
            sx={{
              color: "primary.main",
              fontWeight: "700",

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
    paymentType,
    setPaymentType,
    user,
    control,
    watch,
    handleSubmit,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    onSubmit,
    selectedType,
    options,
    page,
  };
};

export default usePartnerProgram;
