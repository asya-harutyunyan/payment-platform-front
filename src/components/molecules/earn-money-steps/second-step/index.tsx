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
        <P>Add new card +</P>
        <Button text="Confirm" variant={"text"} onClick={onSubmit} />
      </BasicCard>
    </Box>
  );
};
