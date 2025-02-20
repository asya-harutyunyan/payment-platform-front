import bg from "@/assets/images/modal.png";
import { z } from "@/common/validation";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { BasicModal } from "@/components/atoms/modal";
import { FormPhoneInput } from "@/components/atoms/phone-input";
import { SelectFieldWith } from "@/components/atoms/select";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch } from "@/store";
import {
  addBankCardThunk,
  editBankCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof add_card_schema>;
interface IStepTwo {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cardHolder?: string;
  bankName?: string;
  cardNumber?: string;
  phoneNumber?: string;
  bankDetail?: number;
  currency?: string;
  isEdit?: boolean;
}

export const AddCardModal: FC<IStepTwo> = ({
  open,
  setOpen,
  cardHolder,
  bankDetail,
  bankName,
  phoneNumber,
  cardNumber,
  currency,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();

  const handleClose = () => setOpen(false);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: bankName ?? "",
      card_holder: cardHolder ?? "",
      phone_number: phoneNumber ?? "",
      card_number: cardNumber ?? "",
      currency: currency ?? "RUB",
    },
  });
  useEffect(() => {
    setValue("currency", "RUB", { shouldValidate: false });
  }, [setValue]);

  const onAddSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isEdit) {
      dispatch(addBankCardThunk(data))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("bank_card_added_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
          handleClose();
          reset();
        })
        .catch((error) => {
          if (typeof error === "object") {
            for (const key in error) {
              setError(key as keyof FormData, {
                type: "validate",
                message: error[key as keyof FormData][0],
              });
            }
          }
          enqueueSnackbar(t("bank_card_added_error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          reset();
        });
    }
  };

  const onEditSubmit: SubmitHandler<FormData> = async (data) => {
    if (bankDetail) {
      dispatch(editBankCardThunk({ ...data, id: bankDetail }))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("bank_card_added_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
          handleClose();
        })
        .catch((error) => {
          if (typeof error === "object") {
            for (const key in error) {
              setError(key as keyof FormData, {
                type: "validate",
                message: error[key as keyof FormData][0],
              });
            }
          }
        });
    }
  };
  const options = [
    { value: "RUB", label: "RUB (₽)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
  ];
  return (
    <BasicModal handleClose={handleClose} open={open} bg={bg}>
      <Box
        component="form"
        onSubmit={handleSubmit(isEdit ? onEditSubmit : onAddSubmit)}
        sx={{
          width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
        }}
      >
        <FormTextInput
          control={control}
          name="card_holder"
          placeholder={t("name_cards_member")}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="bank_name"
          placeholder={t("bank_info")}
          whiteVariant
        />
        <FormPhoneInput
          control={control}
          name="phone_number"
          placeholder={t("phone_number")}
          style={{}}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="card_number"
          mask
          placeholder={t("card_number")}
          whiteVariant={true}
        />
        <SelectFieldWith
          name="currency"
          control={control}
          options={options}
          whiteVariant
          placeholder={t("select_currency")}
          error={!!errors.currency}
          helperText={errors.currency?.message}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button
            sx={{ width: "99%", height: "50px" }}
            variant={"gradient"}
            type="submit"
            text={t("confirm")}
          />
        </Box>
      </Box>
    </BasicModal>
  );
};
