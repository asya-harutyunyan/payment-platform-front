import second_step from "@/assets/images/step_2.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { RadioButtonsGroup } from "@/components/atoms/radio_button";
import { add_card_schema } from "@/schema/add_card.schema";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddCardModal } from "../../add_card_modal";

type FormData = z.infer<typeof add_card_schema>;
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
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {},
  });

  const cards = [
    { id: 1, value: " **** **** **** 1728 " },
    { id: 2, value: " **** **** **** 1712" },
  ];
  const sumitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
    handleNext?.();
  };

  return (
    <Box
      component="form"
      onSubmit={sumitForm}
      sx={{ display: "flex", justifyContent: "center" }}
    >
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
            onClick={() => handleOpen()}
          >
            {t("add_bank_card")}
          </P>
        </Box>

        <RadioButtonsGroup data={cards} control={control} />
        <Button
          sx={{
            marginTop: "20px",
            width: "40%",
            height: "50px",
            fontSize: "17px",
          }}
          text="confirm"
          variant={"gradient"}
          type="submit"
        />
      </BasicCard>
      <AddCardModal open={open} setOpen={setOpen} />
    </Box>
  );
};
