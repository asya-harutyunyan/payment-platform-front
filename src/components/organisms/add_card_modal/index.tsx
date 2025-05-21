import bg from "@/assets/images/modal.png";
import { z } from "@/common/validation";
import { Autocomplite } from "@/components/atoms/autocomplite";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { BasicModal } from "@/components/atoms/modal";
import { SelectFieldWith } from "@/components/atoms/select";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBankNamesThunk } from "@/store/reducers/allUsersSlice/thunks";
import {
  addBankCardThunk,
  editBankCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

type FormData = z.infer<typeof add_card_schema>;
interface IStepTwo {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cardHolder?: string;
  bankName?: string;
  cardNumber?: string;
  phoneNumber?: string;
  bankDetailID?: number;
  currency?: string;
  isEdit?: boolean;
}

export const AddCardModal: FC<IStepTwo> = ({
  open,
  setOpen,
  cardHolder,
  bankDetailID,
  bankName,
  // phoneNumber,
  cardNumber,
  currency,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();
  const { banks } = useAppSelector((state) => state.users);

  const handleClose = () => setOpen(false);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name:
        isEdit && bankName
          ? { name: bankName, id: bankDetailID, key: bankName }
          : undefined,
      card_holder: cardHolder ?? "",
      // phone_number: phoneNumber ?? "",
      card_number: cardNumber ?? "",
      currency: currency ?? "RUB",
    },
  });

  useEffect(() => {
    setValue("currency", "RUB", { shouldValidate: false });
    if (isEdit) {
      if (bankName && bankDetailID) {
        setValue(
          "bank_name",
          { name: bankName, id: bankDetailID, key: bankName },
          { shouldValidate: false }
        );
      }
    }
    dispatch(getBankNamesThunk());
  }, [dispatch, setValue]);

  const bankNameManual = useWatch({
    control,
    name: "bank_name_manual",
  });

  const onAddSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isEdit) {
      if (bankNameManual) {
        dispatch(
          addBankCardThunk({
            ...data,
            bank_name: {
              name: bankNameManual,
              key: bankNameManual,
              id: Math.random(),
            },
          })
        )
          .unwrap()
          .then(() => {
            reset();
            setValue(
              "bank_name",
              {
                name: "",
                key: "",
                id: 0,
              },
              { shouldValidate: false }
            );
            enqueueSnackbar(t("bank_card_added_success"), {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            fetchAuthUser?.();
            handleClose();
          })
          .catch((error) => {
            if (error.card_number[0] === "Поле номер карты уже занято.") {
              enqueueSnackbar("Карта с этим номером уже существует.", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
            reset();
            setValue(
              "bank_name",
              {
                name: "",
                key: "",
                id: 0,
              },
              { shouldValidate: false }
            );
            if (error.errors && error.message) {
              Object.entries(error.errors).forEach(([field, messages]) => {
                if (Array.isArray(messages) && messages.length > 0) {
                  setError(field as keyof FormData, {
                    type: "manual",
                    message: messages[0],
                  });
                }
              });
            }
            if (
              error.bank_details[0] ===
              "Вы можете добавить не более 3 банковских реквизитов."
            ) {
              enqueueSnackbar(
                "Вы можете добавить не более 3 банковских реквизитов.",
                {
                  variant: "error",
                  anchorOrigin: { vertical: "top", horizontal: "right" },
                }
              );
            }

            enqueueSnackbar(t("something_went_wrong"), {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          });
      } else {
        dispatch(addBankCardThunk(data))
          .unwrap()
          .then(() => {
            reset();
            setValue(
              "bank_name",
              {
                name: "",
                key: "",
                id: 0,
              },
              { shouldValidate: false }
            );
            enqueueSnackbar(t("bank_card_edited_success"), {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            fetchAuthUser?.();
            handleClose();
          })
          .catch((error) => {
            if (error.bank_details[0]) {
              console.log(error.bank_details[0]);
              enqueueSnackbar(
                "Вы можете добавить не более 3 банковских реквизитов.",
                {
                  variant: "error",
                  anchorOrigin: { vertical: "top", horizontal: "right" },
                }
              );
            } else if (
              error.card_number[0] === "Поле номер карты уже занято."
            ) {
              enqueueSnackbar("Карта с этим номером уже существует.", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            } else {
              enqueueSnackbar(t("something_went_wrong"), {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              });
            }
            reset();
            setValue(
              "bank_name",
              {
                name: "",
                key: "",
                id: 0,
              },
              { shouldValidate: false }
            );
            if (error.errors && error.message) {
              Object.entries(error.errors).forEach(([field, messages]) => {
                if (Array.isArray(messages) && messages.length > 0) {
                  setError(field as keyof FormData, {
                    type: "manual",
                    message: messages[0],
                  });
                }
              });
            }
          });
      }
    }
  };

  const onEditSubmit: SubmitHandler<FormData> = async (data) => {
    if (bankDetailID) {
      dispatch(editBankCardThunk({ ...data, id: bankDetailID }))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("bank_card_edited_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
          handleClose();
        })
        .catch((error) => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
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

  const options = [{ id: 1, name: "RUB" }];

  useEffect(() => {
    if (bankName) {
      const bank = banks.find((bank) => bank.key === bankName);
      if (bank) {
        setValue("bank_name", bank);
      }
    }
  }, [bankName, banks, setValue]);

  const bankNameInput = useWatch({
    control,
    name: "bank_name",
  });

  return (
    <BasicModal handleClose={handleClose} open={open} bg={bg}>
      <Box
        component="form"
        onSubmit={handleSubmit(isEdit ? onEditSubmit : onAddSubmit)}
        sx={{
          width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
          marginTop: { lg: "0", md: "0", xs: "20px", sm: "20px" },
          height: { lg: "auto", md: "auto", xs: "500px", sm: "500px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <FormTextInput
          control={control}
          name="card_holder"
          placeholder={t("name_cards_member")}
          whiteVariant
        />
        <Autocomplite
          name="bank_name"
          control={control}
          options={banks}
          whiteVariant
          defaultValueFirst
          defaultValue={
            isEdit && bankName
              ? { name: bankName, id: bankDetailID, key: bankName }
              : undefined
          }
          placeholder={t("bank_name")}
          error={!!errors.bank_name}
          helperText={errors.bank_name?.message}
          disabled={!!bankNameManual}
          style={{ marginBottom: "10px" }}
        />
        {bankNameInput?.name === "Другое" && (
          <FormTextInput
            control={control}
            {...register("bank_name_manual")}
            name="bank_name_manual"
            type="text"
            whiteVariant
            placeholder={t("bank_name")}
          />
        )}
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
          defaultValueFirst
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
