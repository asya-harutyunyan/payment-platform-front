import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { useAuth } from "@/context/auth.context";
import { auth_schema } from "@/schema/signUp.schema";
import { registerUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof auth_schema>;

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(auth_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirmation: "",
      checkbox: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser(data))
      .unwrap()
      .then((response) => {
        if (response.status === 200 && response.data.token) {
          setIsAuthenticated(true);
        }
        navigate({ to: "/auth/sign-in" });

        console.log("Registration successful, token:", response.token);
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

        <FormTextInput control={control} name="name" placeholder="Name" />
        <FormTextInput control={control} name="surname" placeholder="Surname" />
        <FormTextInput
          control={control}
          name="email"
          placeholder="Enter your email"
        />
        <FormTextInput
          control={control}
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <FormTextInput
          control={control}
          name="password_confirmation"
          type="password"
          placeholder="Comfirm your password"
        />
        <Box sx={{ width: "100%" }}>
          <CustomCheckbox
            control={control}
            label={"I agree to the Terms of Service and Privacy Policy"}
            name={"checkbox"}
          />
        </Box>
        <Button
          variant={"contained"}
          color="secondary"
          text={"Register"}
          sx={{ width: "100%" }}
          type="submit"
          disabled={watch("checkbox") !== true}
        />
        <TextWithDivider>
          <P>
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 300,
                fontSize: "14px",
              }}
            >
              You already have an account?
            </Link>
          </P>
        </TextWithDivider>
      </BasicCard>
    </Box>
  );
};

export default SignUpForm;
