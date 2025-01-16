import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { H2, P } from "@/styles/typography";
import { Box } from "@mui/material";

export const StepTwo = () => {
  const onSubmit = () => {
    console.log("Form Data:");
  };
  return (
    <Box component="form" sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard sx={{ width: "70%", marginTop: "20px" }}>
        <H2 color="primary.main" paddingBottom={4} textAlign={"center"}>
          Your profit will be +5%. Does that work for you?{" "}
        </H2>
        <P fontSize={"20px"}>Add new card +</P>
        <P fontSize={"20px"}> there will be card component</P>
        <Button
          sx={{
            marginTop: "20px",
            width: "130px",
            height: "50px",
            fontSize: "17px",
          }}
          text="Confirm"
          variant={"outlined"}
          onClick={onSubmit}
        />
      </BasicCard>
    </Box>
  );
};
