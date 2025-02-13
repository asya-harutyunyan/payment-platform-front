import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { FC } from "react";
import bg from "../../../../assets/images/bg.jpg";
import useSignUp from "./_services/useSignUp";

const SignUpForm: FC = () => {
  const { control, handleSubmit, watch, register, onSubmit } = useSignUp();

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
        flexDirection: {
          lg: "row",
          md: "row",
          sx: "column-reverse",
          xs: "column-reverse",
        },
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
          {t("sign_up_long")}
        </P>
        <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
          {t("sign_up_short")}
        </P>
      </Box>
      <BasicCard
        bgColor
        align="center"
        sx={{
          width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
          height: { lg: "85%", md: "85%", sx: "75%", xs: "75%" },
          marginRight: { lg: "50px", md: "50px", sx: "0", xs: "0" },
          overflowY: "auto",
        }}
      >
        <P
          fontSize={"21px"}
          paddingBottom={"20px"}
          align="center"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          {t("create_account")}
        </P>

        <FormTextInput
          control={control}
          {...register("name")}
          name="name"
          placeholder={t("name")}
        />
        <FormTextInput
          control={control}
          {...register("surname")}
          name="surname"
          placeholder={t("surname")}
        />
        <FormTextInput
          control={control}
          {...register("email")}
          name="email"
          placeholder={t("email")}
        />
        <FormTextInput
          control={control}
          {...register("password")}
          name="password"
          type="password"
          placeholder={t("password")}
        />
        <FormTextInput
          control={control}
          {...register("password_confirmation")}
          name="password_confirmation"
          type="password"
          placeholder={t("password_confirmation")}
        />
        <Box sx={{ width: "100%" }}>
          <CustomCheckbox
            control={control}
            label={t("privacy")}
            name={"checkbox"}
          />
        </Box>
        <Button
          variant={"gradient"}
          color="secondary"
          text={t("register")}
          sx={{ width: "100%", height: "50px" }}
          type="submit"
          disabled={watch("checkbox") !== true}
        />
        <TextWithDivider>
          <P padding={"0 0 10px 0"}>
            <Link
              to="/auth/sign-in"
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

export default SignUpForm;
