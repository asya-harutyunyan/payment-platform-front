import first_step from "@/assets/images/step_1.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { Box } from "@mui/material";
import { t } from "i18next";
import { BaseSyntheticEvent, FC } from "react";
import useProcessingAmount from "./_services/useProcessingAmount";
interface IStepOne {
  handleNext?: () => void;
}

export const StepOne: FC<IStepOne> = ({ handleNext }) => {
  const { handleSubmit, control, processingAmountValue } =
    useProcessingAmount(handleNext);

  // const { deposit } = useAppSelector((state) => state.deposit);

  const sumitForm = async (e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    await handleSubmit(e);
    // console.log(errors);
  };

  // useEffect(() => {
  //   if (deposit?.id) {
  //     // handleNext?.();
  //     // setActiveStep?.(2);
  //   }
  // }, [deposit]);

  return (
    <Box
      component="form"
      onSubmit={sumitForm}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard
        sx={{ width: "100%", marginTop: "20px", padding: "0", height: "330px" }}
        bg={first_step}
        title={t("how_much_money")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            marginTop: "20px",
          }}
        >
          <Box sx={{ width: "60%" }}>
            <FormTextInput
              control={control}
              name="processing_amount"
              placeholder="Price"
              type="number"
              whiteVariant={true}
            />
          </Box>
          <Button
            variant={"text"}
            type="submit"
            disabled={!processingAmountValue}
            sx={{
              height: "50px",
              width: "90%",
              marginTop: "30px",
              fontSize: "18px",
            }}
            text={t("confirm")}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
