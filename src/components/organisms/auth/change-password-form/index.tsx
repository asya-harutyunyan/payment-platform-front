import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { change_password_schema } from "@/schema/change_password.schema";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { z } from "zod";
import bg from "../../../../assets/images/bg.jpg";
import useChangePassword from "./_services/useChangePassword";

export type ConfirmEmailFormData = z.infer<typeof change_password_schema>;

const ChangePasswordComponent = () => {
  const { handleSubmit, onSubmit, register, control } = useChangePassword();
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
          {" "}
          {t("reset_long")}
        </P>
        <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
          {t("reset_short")}
        </P>
      </Box>
      <BasicCard
        bgColor
        align="center"
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
          {t("reset_password")}
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

export default ChangePasswordComponent;
