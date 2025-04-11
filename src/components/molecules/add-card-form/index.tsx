import { Autocomplite } from "@/components/atoms/autocomplite";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { SelectFieldWith } from "@/components/atoms/select";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { addBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { getBankNamesThunk } from "@/store/reducers/usersSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;

export const BankCardDetalis: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name_manual: "",
      card_holder: "",
      // phone_number: "",
      card_number: "",
      currency: "RUB",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state) => state.users);
  const options = [{ id: 1, name: "RUB" }];

  useEffect(() => {
    setValue(
      "bank_name",
      {
        name: "",
        key: "",
        id: 0,
      },
      { shouldValidate: false }
    );

    setValue("currency", "RUB", { shouldValidate: false });
    dispatch(getBankNamesThunk());
  }, [dispatch, setValue]);
  const bankNameManual = useWatch({
    control,
    name: "bank_name_manual",
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
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
          enqueueSnackbar(t("bank_card_edited_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
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
          enqueueSnackbar(t("bank_card_added_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
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
          } else if (error.card_number[0] === "Поле номер карты уже занято.") {
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
  };

  const bankName = useWatch({
    control,
    name: "bank_name",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <FormTextInput
        control={control}
        {...register("card_holder")}
        name="card_holder"
        type="text"
        placeholder={t("name_cards_member")}
      />

      <Autocomplite
        {...register("bank_name.name")}
        name="bank_name.name"
        control={control}
        options={banks}
        placeholder={t("bank_name")}
        error={!!errors.bank_name}
        helperText={errors.bank_name?.message}
        disabled={!!bankNameManual}
        style={{ marginBottom: "10px" }}
      />
      {bankName?.name === "Другое" && (
        <FormTextInput
          control={control}
          {...register("bank_name_manual")}
          name="bank_name_manual"
          type="text"
          placeholder={t("bank_name")}
          style={{ marginBottom: "20px" }}
        />
      )}

      {/* <FormPhoneInput
        control={control}
        {...register("phone_number")}
        name="phone_number"
        placeholder={t("phone_number")}
      /> */}

      <FormTextInput
        control={control}
        {...register("card_number")}
        name="card_number"
        placeholder={t("card_number")}
        whiteVariant={false}
        mask
      />

      <SelectFieldWith
        name="currency"
        control={control}
        options={options}
        defaultValueFirst
        placeholder={t("select_currency")}
        error={!!errors.currency}
        helperText={errors.currency?.message}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            lg: "start",
            md: "start",
            sm: "center",
            xs: "center",
          },
        }}
      >
        <Button
          text={t("add_card")}
          variant={"contained"}
          type="submit"
          sx={{
            marginTop: "20px",
            fontSize: "13px",
            width: "100%",
            height: "50px",
          }}
        />
      </Box>
    </Box>
  );
};
