import third_step from "@/assets/images/step_3.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useBankDetalis from "./_services/useDeposit";
interface IStepThree {
  handleNext?: () => void;
}
export const StepThree: FC<IStepThree> = ({ handleNext }) => {
  const { handleSubmit, onSubmit, control } = useBankDetalis();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: "300px",
        }}
        bg={third_step}
        title={t("step_c")}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1p solid red",
          }}
        >
          <P
            fontSize={"16px"}
            color="tertiary.main"
            paddingBottom={"10px"}
            paddingTop={"20px"}
          >
            Address: Lorem Ipsum
          </P>
          <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
            Currency: Lorem Ipsum
          </P>
          <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
            Network: Lorem Ipsum
          </P>
          <Box sx={{ width: "60%" }}>
            <FormTextInput
              control={control}
              name="transaction_id"
              placeholder="Price"
              type="number"
              whiteVariant={true}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Button
              variant={"outlinedBlue"}
              text={"Back"}
              sx={{ marginRight: "30px", width: "150px", height: "40px" }}
            />
            <Button
              variant={"gradient"}
              text={"Confirm"}
              onClick={() => handleNext?.()}
              sx={{ width: "150px", height: "40px" }}
            />
          </Box>
          <P color="tertiary.main" sx={{ textDecoration: "underline" }}>
            {" "}
            Keep going for 00:34
          </P>
        </Box>
      </BasicCard>
    </Box>
  );
};
