import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { login_schema } from "@/schema/login.schema";
import {
  confirmEmailRequest,
  loginUser,
} from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof login_schema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(login_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);

    dispatch(loginUser(data))
      .then((response) => {
        console.log("Registration successful, token:", response);
        dispatch(confirmEmailRequest());
        navigate({ to: "/auth/confirm-email" });
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
          name="email"
          placeholder="Enter your email"
        />
        <FormTextInput
          control={control}
          name="password"
          placeholder="Enter your password"
        />
        <Box sx={{ width: "100%" }}>
          {/* <CustomCheckbox label={"password button"} control={}/> */}
        </Box>
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

export default LoginForm;
