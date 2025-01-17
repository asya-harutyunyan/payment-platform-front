import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { H2, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";

export const StepTwo = () => {
  const onSubmit = () => {
    console.log("Form Data:");
  };
  return (
    <Box component="form" sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard sx={{ width: "70%", marginTop: "20px" }}>
        <H2
          color="primary.main"
          paddingBottom={4}
          textAlign={"center"}
          sx={{ fontSize: { lg: "28px", md: "28px", sx: "18px", xs: "18px" } }}
        >
          {t("profit")}
        </H2>
        <P fontSize={"20px"} textAlign={"center"}>
          {t("add_bank_card")}+
        </P>
        <P fontSize={"20px"} textAlign={"center"}>
          {" "}
          // there will be card component
        </P>
        <Button
          sx={{
            marginTop: "20px",
            width: "130px",
            height: "50px",
            fontSize: "17px",
          }}
          text="confirm"
          variant={"outlined"}
          onClick={onSubmit}
        />
      </BasicCard>
    </Box>
  );
};
