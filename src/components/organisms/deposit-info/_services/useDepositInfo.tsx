import { BankDetail } from "@/common/types/user";
import { choose_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk } from "@/store/reducers/allUsersSlice/thunks";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import {
  getSingleDepositThunk,
  updateDeposit,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { getSingleOrderThunk } from "@/store/reducers/user-info/orderSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const useDepositInfo = () => {
  const { singleDeposit, loading, singleOrder } = useAppSelector(
    (state) => state.deposit
  );
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
  const cardsFilter = useMemo(() => {
    return (
      (currentUser &&
        currentUser?.bank_details.filter((card) => !card.is_blocked)) ||
      []
    );
  }, [currentUser]);
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
  ];
  const { id } = useParams({ from: "/_auth/_admin/deposit-list/$id" });

  const handleEditCard = () => {
    setOpenModal(true);
    dispatch(getUserThunk(Number(id)));
  };
  useEffect(() => {
    dispatch(getSingleDepositThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
  }, [dispatch, id]);

  return {
    singleDeposit,
    loading,
    singleOrder,
    openModal,
    setOpenModal,
    deposit,
    currentUser,
    userLoading,
    dispatch,
    router,
    canGoBack,
    control,
    handleSubmit,
    setValue,
    onCardDelete,
    submitForm,
    cardsFilter,
    fields,
  };
};

export default useDepositInfo;
