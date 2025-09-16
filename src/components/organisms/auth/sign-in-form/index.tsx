import Circle1 from "@/assets/images/blue_circle_1.png";
import Circle2 from "@/assets/images/blue_circle_2.png";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import { Logo } from "@/components/atoms/logo";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { Colors } from "@/constants";
import { H6, P } from "@/styles/typography";
import { Box, useMediaQuery } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
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

  const isDesktop = useMediaQuery("(min-width:600px)");


  return (
    <Box sx={{
      background: Colors.gradientBgSignIn,
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
    }}>
      {!isDesktop &&
        <Box component={Link} to="/" sx={{ width: "84px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", p: "16px 0 0 17px" }}>
          <Logo width="26px" height="26px" />
          <H6
            sx={{
              fontSize: "12px",
            }}
          >
            PayHub
          </H6>
        </Box>
      }
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "80vh", sm: "100vh" },
          pb: { xs: "30px", sm: "0" }
        }}
      >
        <Box width="900px" maxWidth={900} margin="0 auto" display="flex" justifyContent="center" position="relative">
          <Box
            sx={{
              position: "absolute",
              left: { xs: "5px", sm: "-30px" },
              bottom: { xs: "-40px", sm: "-110px" },
              width: { xs: "130px", sm: "270px" },
              height: { xs: "165px", sm: "348px" },
            }}
          >
            <img src={Circle2} alt="Blue circle" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: { xs: "10px", sm: "50px" },
              top: { xs: "-20px", sm: "5px" },
              width: { xs: "86px", sm: "150px" },
              height: { xs: "86px", sm: "150px" },
            }}
          >
            <img src={Circle1} alt="Blue circle" style={{ width: "100%", height: "100%" }} />
          </Box>
          <BasicCard
            sx={{
              width: "60%",
              borderRadius: "40px",
              background: "rgba(255, 255, 255, 0.01)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              backgroundColor: "transparent",
              boxShadow: Colors.transparentBoxShadow,
              zIndex: "1",
            }}
          >
            <P
              fontSize={{ xs: "24px", sm: "36px" }}
              paddingBottom={{ xs: "23px", sm: "40px" }}
              fontWeight={600}
              color={Colors.white}
              width="max-content"
              margin="0 auto"
            >
              {t("welcome_sign_in")}
            </P>
            <FormTextInput
              control={control}
              type="text"
              name="email"
              onChange={handleEmailOrPasswordChange}
              placeholder={t("email")}
              greenGradientVariant
            />

            <FormTextInput
              control={control}
              name="password"
              type="password"
              onChange={handleEmailOrPasswordChange}
              placeholder={t("password")}
              greenGradientVariant
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
              <P sx={{ padding: { xs: "13px 0", sm: "20px 0" }, fontSize: "14px" }}>
                <Link
                  to="/auth/reset-password"
                  style={{
                    color: Colors.white,
                    fontSize: "14px",
                    textDecoration: "none"
                  }}
                >
                  {t("forgot_password")}
                </Link>
              </P>
            </Box>
            <NewButton
              variant={"gradient"}
              color="primary"
              text={t("sign_in")}
              sx={{ width: "100%", margin: { xs: "0", sm: "20px 0" }, height: "50px" }}
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
                <P textAlign="center" fontSize="14px" fontWeight={500}>
                  <Link
                    to="/auth/sign-up"
                    style={{
                      color: Colors.white,
                      textDecoration: "none",
                    }}
                  >
                    {t("already")}
                    <span style={{ textDecoration: "underline", fontWeight: 700 }}>
                      {" "}
                      {t("sign_up")}
                    </span>
                  </Link>
                </P>
              </TextWithDivider>
            </Box>
          </BasicCard>
        </Box>
      </Box >
      <TwoFAModal open={isTwoFAModalOpen} onClose={handleModalClose} />
    </Box >
  );
};

export default LoginForm;
