import Button from "@/components/atoms/button";
import { add_card_schema } from "@/schema/add_card.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;

export const BankCardDetalis: FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: "",
      first_name: "",
      last_name: "",
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
      {/* <FormTextInput
        control={control}
        name="name_cards_member"
        placeholder={t("name_cards_member")}
      />
      <FormTextInput
        control={control}
        name="card_number"
        placeholder={t("card_number")}
      /> */}
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
