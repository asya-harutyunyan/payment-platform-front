import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { reset_schema } from "@/schema/change_password.schema";
import { setEmail } from "@/store/reducers/auth/authSlice";
import { resetPassword } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export type ResetPasswordschema = z.infer<typeof reset_schema>;

const ResetPasswordComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ResetPasswordschema>({
    resolver: zodResolver(reset_schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordschema> = async (data) => {
    console.log("Form Data:", data);
    dispatch(setEmail(data.email));

    dispatch(resetPassword(data))
      .then((response) => {
        console.log("Registration successful, token:", response);
        navigate({ to: "/auth/change-password" });
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: { lg: "end", md: "end", sx: "center", xs: "center" },
        alignItems: "center",
        bgcolor: "#1f70cb",
      }}
    >
      <BasicCard
        sx={{
          width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
          height: "60%",
          marginRight: { lg: "50px", md: "50px", sx: "0", xs: "0" },
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
        <FormTextInput
          control={control}
          name="email"
          placeholder="Enter your email"
        />

        <Button
          variant={"contained"}
          color="secondary"
          text={"Login"}
          sx={{ width: "100%", margin: "20px 0", height: "50px" }}
          type="submit"
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
            onClick={() => navigate({ to: "/auth/sign-up" })}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};

export default ResetPasswordComponent;
