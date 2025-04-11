import bg from "@/assets/images/modal.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import TaskHeader from "@/components/molecules/title";
import { choose_card_schema } from "@/schema/add_card.schema";
import EditIcon from "@mui/icons-material/Edit";

import { useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import {
  getSingleDepositThunk,
  getSingleOrderThunk,
  updateDeposit,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { getUserThunk } from "@/store/reducers/usersSlice/thunks";
import { H4, H5 } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, CircularProgress } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { BaseSyntheticEvent, FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Paper } from "../paper/paper";

export const DepositInfo: FC = () => {
  const { singleDeposit, loading, singleOrder } = useAppSelector(
    (state) => state.deposit
  );

  const { id } = useParams({ from: "/_auth/_admin/deposit-list/$id" });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { deposit } = useAppSelector((state) => state.deposit);
  const { user: currentUser, loading: userLoading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { control, handleSubmit, setValue } = useForm<Partial<Deposit>>({
    resolver: zodResolver(choose_card_schema),
    defaultValues: {
      payment_method_id:
        currentUser?.bank_details?.[0]?.id?.toString() ??
        deposit?.payment_method_id,
    },
  });
  useEffect(() => {
    if (deposit?.payment_method_id) {
      setValue("payment_method_id", deposit.payment_method_id);
    }
  }, [deposit, setValue]);

  useEffect(() => {
    dispatch(getSingleDepositThunk(id));
  }, [dispatch, id]);

  const onCardDelete = (card: BankDetail) => {
    dispatch(deleteBankCardThunk(card.id))
      .unwrap()
      .then(() => {})
      .catch(() => {
        enqueueSnackbar(t("delete_error_card"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  const submitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
  };

  const onSubmit = (formData: Partial<Deposit>) => {
    dispatch(
      updateDeposit({
        id: singleOrder?.deposit_id,
        payment_method_id: formData.payment_method_id,
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("card_changed"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOpenModal(false);
      })
      .catch(() => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOpenModal(false);
      });
  };
  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
  }, [dispatch, id]);

  const cardsFilter = useMemo(() => {
    return (
      (currentUser &&
        currentUser?.bank_details.filter((card) => !card.is_blocked)) ||
      []
    );
  }, [currentUser]);

  const handleEditCard = () => {
    setOpenModal(true);
    dispatch(getUserThunk(Number(id)));
  };
  const fields = [
    {
      column: "name",
      valueKey: "user.name",
    },
    {
      column: "surname",
      valueKey: "user.surname",
    },
    {
      column: "email",
      valueKey: "user.email",
    },
    {
      column: "processing_amount",
      currency: "deposit_currency",
      valueKey: "amount",
    },
    {
      column: "profit_2",
      currency: "order_currency",
      valueKey: "profit",
    },
    {
      column: "final_status_deposit",
      valueKey: "status_by_admin",
    },
    {
      column: "left_amount",
      currency: "order_currency",
      valueKey: "processing_amount",
    },
    {
      column: "bank_name",
      label: "payment_details",
      valueKey: "payment_method.bank_name",
    },
    {
      column: "card_holder",
      valueKey: "payment_method.card_holder",
    },
    {
      column: "card_number",
      valueKey: "payment_method.card_number",
      renderComponent: () => {
        return (
          <span
            onClick={handleEditCard}
            style={{ paddingLeft: "10px", cursor: "pointer" }}
          >
            <EditIcon />
          </span>
        );
      },
    },
    {
      column: "currency",
      valueKey: "payment_method.currency",
    },
    {
      column: "user_blocked_card",
      valueKey: "user.bank_details.card_number",
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
        {" "}
        {canGoBack && (
          <Button
            onClick={() => router.history.back()}
            variant={"outlined"}
            text={t("back")}
            sx={{ height: "30px", fontSize: "15px", color: "primary.main" }}
            icon={ArrowLeftIcon}
          />
        )}
        <TaskHeader
          title={t("deposit_information")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
      {!singleDeposit ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleDeposit}
            fields={fields}
            title={"deposit_information_single"}
            loading={loading}
          />
        </Box>
      )}
      <BasicModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        bg={bg}
        width="50%"
      >
        <Box component="form" onSubmit={submitForm}>
          <H4 align="center">{t("change_card")}</H4>
          {userLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              {" "}
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : cardsFilter.length ? (
            <RadioButtonsGroup
              data={cardsFilter}
              control={control}
              name="payment_method_id"
              labelKey="card_number"
              valueKey="id"
              onItemDelete={onCardDelete}
            />
          ) : (
            <H5
              align="center"
              sx={{ textDecoration: "underline" }}
              color="tertiary.text"
            >
              {t("no_data")}
            </H5>
          )}
          {cardsFilter.length ? (
            <Button
              sx={{
                marginTop: "20px",
                width: { lg: "100%", md: "100%", xs: "100%", sm: "100%" },
                height: "50px",
                fontSize: "17px",
              }}
              text={t("confirm")}
              variant={"gradient"}
              type="submit"
            />
          ) : (
            ""
          )}
        </Box>
      </BasicModal>
    </Box>
  );
};
