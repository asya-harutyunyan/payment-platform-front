import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
// import { BasicTextFields } from "@/components/atoms/input";
import TextWithDivider from "@/components/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  surname: z.string(),
});
type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        bgcolor: "#1f70cb",
      }}
    >
      <BasicCard
        sx={{
          width: "40%",
          height: "80%",
          marginRight: "50px",
        }}
      >
        <P
          fontSize={"21px"}
          paddingBottom={"20px"}
          align="center"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          If you are logging in for the first time, please, change your password
          using the Forgot password button
        </P>
        {/* <BasicTextFields
          sx={{ width: "100%" }}
          placeholder={"Your email address"}
        />
        <BasicTextFields sx={{ width: "100%" }} placeholder={"Password"} /> */}
        <FormTextInput
          control={control}
          name="name"
          placeholder="Enter your password"
        />
        <FormTextInput
          control={control}
          name="surname"
          placeholder="Comfirm your password"
        />
        <Box sx={{ width: "100%" }}>
          {/* <CustomCheckbox label={"password button"} control={}/> */}
        </Box>
        <Button
          variant={"contained"}
          color="secondary"
          text={"Login"}
          sx={{ width: "100%" }}
        />
        <TextWithDivider>
          <P>
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 300,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Haven't account?
            </Link>
          </P>
        </TextWithDivider>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <P style={{ padding: "30px 0", fontSize: "14px" }}>
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
              }}
            >
              Forgot your password?
            </Link>
          </P>
          <Button
            variant={"outlined"}
            color="secondary"
            text={"Sign up"}
            sx={{ fontSize: "14px", height: "50px" }}
            isLink
            link="/auth/sign-up"
          />
        </Box>
      </BasicCard>
    </Box>
  );
};

export default LoginForm;
