import first_step from "@/assets/images/step_1.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { Box } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction } from "react";
import useProcessingAmount from "./_services/useProcessingAmount";
interface IStepOne {
  setNext: Dispatch<SetStateAction<boolean>>;
}

export const StepOne: FC<IStepOne> = ({ setNext }) => {
  const { handleSubmit, onSubmit, control, processingAmountValue } =
    useProcessingAmount();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard
        sx={{ width: "100%", marginTop: "20px", padding: "0", height: "300px" }}
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
            onClick={() => setNext(true)}
            sx={{
              height: "50px",
              width: "90%",
              marginTop: "30px",
              fontSize: "18px",
            }}
            text={"test"}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
