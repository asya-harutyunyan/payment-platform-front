import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { FormPhoneInput } from "@/components/atoms/phone-input";
import { SelectFieldWith } from "@/components/atoms/select";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch } from "@/store";
import { addBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;

export const BankCardDetalis: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: "",
      card_holder: "",
      phone_number: "",
      card_number: "",
      currency: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();
  const dispatch = useAppDispatch();
  const options = [
    { value: "USD", label: "USD ($)" },
    { value: "RUB", label: "RUB (₽)" },
    { value: "EUR", label: "EUR (€)" },
  ];
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
      .catch(() => {
        enqueueSnackbar(t("bank_card_added_error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
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
        name="card_holder"
        placeholder={t("name_cards_member")}
      />
      <FormTextInput
        control={control}
        name="bank_name"
        placeholder={t("bank_info")}
      />
      <FormPhoneInput
        control={control}
        name="phone_number"
        placeholder={t("phone_number")}
      />

      <FormTextInput
        control={control}
        name="card_number"
        placeholder={t("card_number")}
        whiteVariant={false}
        mask
      />

      <SelectFieldWith
        name="currency"
        control={control}
        options={options}
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
