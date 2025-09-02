import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import bg from "../../../../assets/images/bg.jpg";
import { TwoFAModal } from "../../two-fa-modal";
import useSignIn, { EUserRole } from "./_services/useSignIn";

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    onSubmit,
    isTwoFAModalOpen,
    getUserRoleData,
    handleModalClose,
    handleEmailOrPasswordChange,
    handleRecaptchaVerify,
  } = useSignIn();

  return (
    <>
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
            width: { lg: "60%", md: "60%", sx: "70%", xs: "70%" },
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
            {t("sign_in_long")}
          </P>
          <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
            {t("sign_in_short")}
          </P>
        </Box>
        <BasicCard
          bgColor
          sx={{
            width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
            height: { lg: "63%", md: "63%", sx: "60%", xs: "60%" },
            marginRight: { lg: "50px", md: "50px", sx: "0", xs: "0" },
          }}
          align="center"
        >
          <P
            fontSize={"21px"}
            paddingBottom={"20px"}
            fontWeight={500}
            color={theme.palette.primary.main}
          >
            {t("welcome_sign_in")}
          </P>
          <FormTextInput
            control={control}
            type="text"
            name="email"
            onChange={handleEmailOrPasswordChange}
            placeholder={t("email")}
          />
          <FormTextInput
            control={control}
            name="password"
            type="password"
            onChange={handleEmailOrPasswordChange}
            placeholder={t("password")}
          />

          {getUserRoleData?.role !== EUserRole.SuperAdmin &&
            getUserRoleData?.role !== EUserRole.Client &&
            getUserRoleData?.google2fa_enabled && (
              <FormTextInput
                control={control}
                name="otp"
                placeholder={t("otp_code")}
              />
            )}

          {getUserRoleData?.role === EUserRole.Client && (
            <GoogleReCaptcha onVerify={handleRecaptchaVerify} />
          )}

          <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
            <P style={{ padding: "20px 0", fontSize: "14px" }}>
              <Link
                to="/auth/reset-password"
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                {t("forgot_password")}
              </Link>
            </P>
          </Box>
          <Button
            variant={"gradient"}
            color="secondary"
            text={t("sign_in")}
            sx={{ width: "100%", margin: "20px 0", height: "50px" }}
            type="submit"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextWithDivider>
              <P>
                <Link
                  to="/auth/sign-up"
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 300,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  {t("already")}
                  <span style={{ textDecoration: "underline" }}>
                    {" "}
                    {t("sign_up")}
                  </span>
                </Link>
              </P>
            </TextWithDivider>
          </Box>
        </BasicCard>
      </Box>

      <TwoFAModal open={isTwoFAModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default LoginForm;
