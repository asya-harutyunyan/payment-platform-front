import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { price_schema } from "@/schema/price.schema";
import { H2 } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof price_schema>;

export const StepOne = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(price_schema),
    defaultValues: {
      price: "",
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <BasicCard sx={{ width: "70%", marginTop: "20px" }}>
        <H2 color="primary.main" paddingBottom={4} textAlign={"center"}>
          How much money do you want to earn?
        </H2>
        <FormTextInput
          control={control}
          name="price"
          placeholder="Price"
          type="number"
        />
        <Button
          text="Confirmation"
          variant="contained"
          sx={{
            height: "50px",
            width: "170px",
            marginTop: "30px",
            fontSize: "18px",
          }}
        />
      </BasicCard>
    </Box>
  );
};
