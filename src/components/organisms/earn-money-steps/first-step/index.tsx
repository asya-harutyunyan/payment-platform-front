import first_step from "@/assets/images/step_1_bg.png";
import NewButton from "@/components/atoms/btn";

import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { useFormSteps } from "@/context/form-steps.context";
import { H2, H6 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { BaseSyntheticEvent, FC } from "react";
import useProcessingAmount from "./_services/useProcessingAmount";

interface IStepOne {
  handleNext?: () => void;
}

export const StepOne: FC<IStepOne> = ({ handleNext }) => {
  const { updateStepOne, markStepCompleted } = useFormSteps();
  const { handleSubmit, control, processingAmountValue } =
    useProcessingAmount(handleNext);

  const submitForm = async (e?: BaseSyntheticEvent) => {
    e?.preventDefault();

    if (processingAmountValue) {
      updateStepOne({ amount: processingAmountValue });
      markStepCompleted(0);
    }

    await handleSubmit(e);
  };

  return (
    <Box
      component="form"
      onSubmit={submitForm}
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "100%",
      }}
    >
      <BasicCard
        sx={{
          width: "100%",
          p: 0,
          m: 0,
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: { xs: "100% 50%", md: "100% 90%" },
          backgroundImage: `url(${first_step})`,
        }}
      >
        <H2
          color="#000000"
          align="center"
          width="100%"
          p="0"
          mt="20px"
          fontSize={{ xs: "16px", md: "32px" }}
        >
          {t("how_much_money")}
        </H2>
        <H6
          color="#000000"
          align="center"
          sx={{ width: "100%", maxWidth: 520, lineHeight: 1.35 }}
          fontSize={{ xs: "14px", md: "16px" }}
        >
          Вы получаете{" "}
          <span style={{ color: "#047ced", fontSize: 24 }}>5%</span> от суммы
          сделанного депозита. Чем больше депозит — тем выше ваша прибыль.
        </H6>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            mt: 2,
            gap: "10px",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "73%" } }}>
            <FormTextInput
              control={control}
              placeholder="Введите сумму"
              type="number"
              lightGreyVariant
              name="amount"
              numeric
            />
          </Box>

          <NewButton
            variant="gradient"
            type="submit"
            disabled={!processingAmountValue}
            sx={{
              height: 50,
              width: { xs: "100%", md: "73%" },
              fontSize: 18,
            }}
            text={t("confirm")}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
