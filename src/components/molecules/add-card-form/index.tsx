import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { FormPhoneInput } from "@/components/atoms/phone-input";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch } from "@/store/reducers/store";
import { addBankCardThunk } from "@/store/reducers/user/bankDetailsSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;

export const BankCardDetalis: FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: "",
      card_holder: "",
      phone_number: "",
      card_number: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();
  const dispatch = useAppDispatch();

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
      <Box sx={{ display: "flex" }}>
        <Button
          text={t("add_card")}
          variant={"contained"}
          type="submit"
          sx={{
            marginTop: "20px",
            fontSize: "13px",
            width: "150px",
            height: "50px",
          }}
        />
      </Box>
    </Box>
  );
};
