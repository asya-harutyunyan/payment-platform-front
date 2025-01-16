import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { change_password_schema } from "@/schema/change_password.schema";
import { setEmail } from "@/store/reducers/auth/authSlice";
import { changePassword } from "@/store/reducers/auth/authSlice/thunks";
import { RootState, useAppDispatch } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

export type ConfirmEmailFormData = z.infer<typeof change_password_schema>;

const ChangePasswordComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.email);

  const { control, handleSubmit } = useForm<ConfirmEmailFormData>({
    resolver: zodResolver(change_password_schema),
    defaultValues: {
      email: email,
      two_factor_code: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ConfirmEmailFormData> = async (data) => {
    console.log("Form Data:", data);

    dispatch(changePassword(data))
      .then((response) => {
        console.log("Registration successful, token:", response);
        navigate({ to: "/" });
        setEmail("");
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
        <FormTextInput
          control={control}
          name="two_factor_code"
          placeholder="Enter code"
        />

        <FormTextInput
          control={control}
          name="password"
          type="password"
          placeholder="New password"
        />

        <FormTextInput
          control={control}
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
        />

        <Button
          variant={"contained"}
          color="secondary"
          text={"Login"}
          sx={{ width: "100%" }}
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
            isLink
            link="/auth/sign-up"
          />
        </Box>
      </BasicCard>
    </Box>
  );
};

export default ChangePasswordComponent;
