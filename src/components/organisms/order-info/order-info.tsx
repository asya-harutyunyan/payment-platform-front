import bg from "@/assets/images/modal.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import TaskHeader from "@/components/molecules/title";
import { choose_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import {
  getSingleOrderThunk,
  updateDeposit,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { getUserThunk } from "@/store/reducers/usersSlice/thunks";
import { H4 } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { BaseSyntheticEvent, FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Paper } from "../paper/paper";
import { fields } from "./columns";

export const OrderInfo: FC = () => {
  const { singleOrder, loading } = useAppSelector((state) => state.deposit);
  const { id } = useParams({ from: "/_auth/_admin/order-list/$id" });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { deposit } = useAppSelector((state) => state.deposit);
  const { user: currentUser } = useAppSelector((state) => state.users);

  const { control, handleSubmit, setValue } = useForm<Partial<Deposit>>({
    resolver: zodResolver(choose_card_schema),
    defaultValues: {
      payment_method_id:
        currentUser?.bank_details?.[0]?.id?.toString() ??
        deposit?.payment_method_id,
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
  }, [dispatch, id]);

  const handleEditCard = () => {
    setOpenModal(true);
    dispatch(getUserThunk(Number(id)));
  };
  const cardsFilter = useMemo(() => {
    return (
      (currentUser &&
        currentUser?.bank_details.filter((card) => !card.is_blocked)) ||
      []
    );
  }, [currentUser?.bank_details]);

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
  useEffect(() => {
    if (deposit?.payment_method_id) {
      setValue("payment_method_id", deposit.payment_method_id);
    }
  }, [deposit, setValue]);

  // useEffect(() => {
  //   dispatch(updateDepositAdminStatus(singleOrder.id));
  // }, []);
  const onSubmit = (formData: Partial<Deposit>) => {
    dispatch(
      updateDeposit({
        id: singleOrder?.deposit_id,
        payment_method_id: formData.payment_method_id,
      })
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("delete_error_card"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .catch(() => {
        enqueueSnackbar(t("delete_error_card"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  console.log(singleOrder);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
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
          title={t("order_list")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
      {!singleOrder ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleOrder}
            fields={fields}
            title={"orders_information_single"}
            loading={loading}
            handleClick={handleEditCard}
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
          <RadioButtonsGroup
            data={cardsFilter}
            control={control}
            name="payment_method_id"
            labelKey="card_number"
            valueKey="id"
            onItemDelete={onCardDelete}
          />
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
        </Box>
      </BasicModal>
    </Box>
  );
};
