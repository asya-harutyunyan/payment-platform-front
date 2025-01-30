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
import { t } from "i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import bg from "../../../../assets/images/bg.jpeg";

export type ConfirmEmailFormData = z.infer<typeof change_password_schema>;

const ChangePasswordComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.email);

  const { control, handleSubmit, register } = useForm<ConfirmEmailFormData>({
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        //change
        if (!response.error) {
          navigate({ to: "/auth/sign-in" });
        }
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
        justifyContent: { lg: "end", md: "end", sx: "center", xs: "center" },
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: { lg: "50%", md: "50%", sx: "70%", xs: "70%" },
          display: { lg: "flex", md: "flex", sx: "none", xs: "none" },
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <P
          fontSize={"30px"}
          color="primary.contrastText"
          width={"75%"}
          paddingBottom={"20px"}
        >
          {t("lorem_short")}
        </P>
        <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
          {t("lorem_short")}
        </P>
      </Box>
      <BasicCard
        sx={{
          width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
          height: "80%",
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
          {t("lorem_short")}
        </P>
        <FormTextInput
          control={control}
          {...register("two_factor_code")}
          name="two_factor_code"
          placeholder={t("enter_code")}
        />

        <FormTextInput
          control={control}
          {...register("password")}
          name="password"
          type="password"
          placeholder={t("new_password")}
        />

        <FormTextInput
          control={control}
          {...register("password_confirmation")}
          name="password_confirmation"
          type={t("password_confirmation")}
          placeholder={t("password_confirmation")}
        />

        <Button
          variant={"gradient"}
          color="secondary"
          text={t("change_password")}
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
              {t("have_account")}{" "}
              <span style={{ textDecoration: "underline" }}>
                {t("sign_in")}
              </span>
            </Link>
          </P>
        </TextWithDivider>
      </BasicCard>
    </Box>
  );
};

export default ChangePasswordComponent;
