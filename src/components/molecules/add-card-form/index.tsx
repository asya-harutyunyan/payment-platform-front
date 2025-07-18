import { Autocomplite } from "@/components/atoms/autocomplite";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { SelectFieldWith } from "@/components/atoms/select";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { useAddCardForm } from "./_service/useAddCardForm";

export const BankCardDetalis: FC = () => {
  const {
    control,
    handleSubmit,
    register,
    errors,
    bankName,
    onSubmit,
    options,
    banks,
    bankNameManual,
  } = useAddCardForm();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <FormTextInput
        control={control}
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
        error={!!errors.bank_name}
        helperText={errors.bank_name?.message}
        disabled={!!bankNameManual}
        style={{ marginBottom: "10px" }}
      />
      {bankName?.name === "Другое" && (
        <FormTextInput
          control={control}
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
        name="card_number"
        placeholder={t("card_number")}
        whiteVariant={false}
        // mask
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
