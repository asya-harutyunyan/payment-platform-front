import first_step from "@/assets/images/step_1.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { price_schema } from "@/schema/price.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
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
              name="price"
              placeholder="Price"
              type="number"
              // style={{
              //   fieldset: { border: "1px solid white" },
              //   "&:.MuiOutlinedInput-input": {
              //     border: "1px solid white",
              //   },
              // }}
            />
          </Box>
          <Button
            variant={"text"}
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
