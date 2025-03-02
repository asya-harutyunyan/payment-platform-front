import { Autocomplite } from "@/components/atoms/autocomplite";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { FormPhoneInput } from "@/components/atoms/phone-input";
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
import { SubmitHandler, useForm } from "react-hook-form";
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
      card_holder: "",
      phone_number: "",
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
    setValue("currency", "RUB", { shouldValidate: false });
    dispatch(getBankNamesThunk());
  }, [dispatch, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(addBankCardThunk(data))
      .unwrap()
      .then(() => {
        reset();
        enqueueSnackbar(t("bank_card_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        fetchAuthUser?.();
      })
      .catch((error) => {
        console.log(error);

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
        } else {
          enqueueSnackbar(t("bank_card_added_error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }

        reset();
      });
  };
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
        {...register("bank_name")}
        name="bank_name"
        control={control}
        options={banks}
        placeholder={t("bank_name")}
        error={!!errors.currency}
        helperText={errors.currency?.message}
      />
      <FormPhoneInput
        control={control}
        {...register("phone_number")}
        name="phone_number"
        placeholder={t("phone_number")}
      />

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
