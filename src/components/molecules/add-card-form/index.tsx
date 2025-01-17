import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { bank_card_schema } from "@/schema/bank_card_detalis.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof bank_card_schema>;

export const BankCardDetalis: FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(bank_card_schema),
    defaultValues: {
      name_cards_member: "",
      card_number: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async () => {};
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <FormTextInput
        control={control}
        name="name_cards_member"
        placeholder={t("name_cards_member")}
      />
      <FormTextInput
        control={control}
        name="card_number"
        placeholder={t("card_number")}
      />
      <Box sx={{ display: "flex" }}>
        <Button
          text="Add Card"
          variant={"contained"}
          sx={{
            marginTop: "20px",
            fontSize: "17px",
            width: "150px",
            height: "50px",
          }}
        />
      </Box>
    </Box>
  );
};
