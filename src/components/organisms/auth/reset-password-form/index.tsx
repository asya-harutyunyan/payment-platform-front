import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import bg from "../../../../assets/images/bg.jpg";
import useResetPassword from "./_services/useResetPassword";

const ResetPasswordComponent = () => {
  const { onSubmit, handleSubmit, control } = useResetPassword();
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
          {t("reset_email_long")}
        </P>
        <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
          {t("reset_email_short")}
        </P>
      </Box>
      <BasicCard
        bgColor
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
          {t("reset_email_short")}
        </P>
        <FormTextInput
          control={control}
          name="email"
          placeholder={t("email")}
        />

        <Button
          variant={"gradient"}
          color="secondary"
          text={t("send_email")}
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

export default ResetPasswordComponent;
