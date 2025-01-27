import bg from "@/assets/images/modal.png";
import second_step from "@/assets/images/step_2.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { BasicModal } from "@/components/atoms/modal";
import { RadioButtonsGroup } from "@/components/atoms/radio_button";
import { bank_card_schema } from "@/schema/bank_card_detalis.schema";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof bank_card_schema>;
interface IStepTwo {
  handleNext?: () => void;
  handleBack?: () => void;
}

export const StepTwo: FC<IStepTwo> = ({ handleNext, handleBack }) => {
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    console.log("Form Data:");
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(bank_card_schema),
    defaultValues: {
      name_cards_member: "",
      card_number: "",
    },
  });
  const cards = [
    { id: 1, value: " **** **** **** 1728 " },
    { id: 2, value: " **** **** **** 1712" },
  ];

  return (
    <Box component="form" sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: "300px",
        }}
        bg={second_step}
        title={t("profit")}
        sub_title="+5"
        // title_B={t("profit_B")}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          onClick={handleOpen}
        >
          <AddCircleIcon sx={{ color: "tertiary.main", cursor: "pointer" }} />
          <P
            fontSize={"20px"}
            textAlign={"center"}
            color="tertiary.main"
            sx={{
              textDecoration: "underline",
              paddingLeft: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleBack?.()}
          >
            {t("add_bank_card")}
          </P>
        </Box>

        <RadioButtonsGroup data={cards} />
        <Button
          sx={{
            marginTop: "20px",
            width: "40%",
            height: "50px",
            fontSize: "17px",
          }}
          text="confirm"
          variant={"gradient"}
          // type="submit"
          onClick={() => handleNext?.()}
        />
      </BasicCard>
      <BasicModal handleClose={handleClose} open={open} bg={bg}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "40%",
          }}
        >
          <FormTextInput
            control={control}
            name="name_cards_member"
            placeholder={t("name_cards_member")}
            whiteVariant
          />
          <FormTextInput
            control={control}
            name="surname_cards_member"
            placeholder={t("surname")}
            whiteVariant
          />
          <FormTextInput
            control={control}
            name="card_number"
            placeholder={t("card_number")}
            whiteVariant
          />
          <FormTextInput
            control={control}
            name="bank_name"
            placeholder={t("bank_name")}
            whiteVariant
          />
          <FormTextInput
            control={control}
            name="phone_number"
            placeholder={t("phone_number")}
            whiteVariant
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
              text={t("confirm")}
            />
          </Box>
        </Box>
      </BasicModal>
    </Box>
  );
};
