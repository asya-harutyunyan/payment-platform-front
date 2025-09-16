import Circle1 from "@/assets/images/blue_circle_1.png";
import Circle2 from "@/assets/images/blue_circle_2.png";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { FormTextInput } from "@/components/atoms/input";
import { Logo } from "@/components/atoms/logo";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { Colors } from "@/constants";
import { H6, P } from "@/styles/typography";
import { Box, useMediaQuery } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { FC } from "react";
import useSignUp from "./_services/useSignUp";

const SignUpForm: FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    onSubmit,
  } = useSignUp();

  const isDesktop = useMediaQuery("(min-width:600px)");


  return (
    <Box sx={{
      background: Colors.gradientBgSignIn,
      width: "100%",
      minHeight: "100vh"
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
          justifyContent: { lg: "end", md: "end", sx: "center", xs: "center" },
          alignItems: "center",
          py: "30px"
        }}
      >
        <Box width="900px" maxWidth={900} margin="0 auto" display="flex" justifyContent="center" position="relative">
          <Box
            sx={{
              position: "absolute",
              left: { xs: "5px", sm: "-10px" },
              bottom: { xs: "-40px", sm: "-50px" },
              width: { xs: "130px", sm: "270px" },
              height: { xs: "165px", sm: "348px" },
            }}
          >
            <img src={Circle2} alt="Blue circle" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: { xs: "10px", sm: "80px" },
              top: { xs: "-20px", sm: "15px" },
              width: { xs: "86px", sm: "150px" },
              height: { xs: "86px", sm: "150px" },
            }}
          >
            <img src={Circle1} alt="Blue circle" style={{ width: "100%", height: "100%" }} />
          </Box>
          <BasicCard
            sx={{
              width: "50%",
              height: "40%",
              borderRadius: "40px",
              background: "rgba(255, 255, 255, 0.01)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              backgroundColor: "transparent",
              boxShadow: Colors.transparentBoxShadow,
              zIndex: "1",
              p: "22px 40px 0px 40px"
            }}
          >
            <P
              fontSize={{ xs: "24px", sm: "36px" }}
              paddingBottom={{ xs: "0", sm: "25px" }}
              fontWeight={600}
              color={Colors.white}
              width="max-content"
              margin="0 auto"
            >
              {t("create_account")}
            </P>
            <FormTextInput
              control={control}
              name="name"
              placeholder={t("name")}
              greenGradientVariant
            />
            <FormTextInput
              control={control}
              name="surname"
              placeholder={t("surname")}
              greenGradientVariant
            />
            <FormTextInput
              control={control}
              name="referral_code"
              placeholder={t("referral_code")}
              greenGradientVariant
            />
            <FormTextInput
              control={control}
              name="email"
              placeholder={t("email")}
              greenGradientVariant
            />

            <FormTextInput
              control={control}
              name="password"
              type="password"
              placeholder={t("password")}
              greenGradientVariant
            />
            <FormTextInput
              control={control}
              name="password_confirmation"
              type="password"
              placeholder={t("password_confirmation")}
              greenGradientVariant
            />
            <Box sx={{ width: "100%" }}>
              <CustomCheckbox
                control={control}
                label={t("privacy")}
                name={"checkbox"}
                checkedColor={Colors.white}
                uncheckedColor={Colors.white}
                labelColor={Colors.white}

              />
            </Box>
            <NewButton
              variant={"gradient"}
              color="primary"
              text={t("register")}
              sx={{ width: "100%", height: "50px" }}
              type="submit"
              disabled={watch("checkbox") !== true}
            />
            <TextWithDivider>
              <Box
                component={Link}
                to="/auth/sign-in"
                sx={{
                  color: Colors.white,
                  fontWeight: 500,
                  fontSize: { xs: "12px", sm: "14px" },
                  textDecoration: "none",
                }}
              >
                {t("have_account")}{" "}
                <span style={{ textDecoration: "underline" }}>
                  {t("sign_in")}
                </span>
              </Box>
            </TextWithDivider>
          </BasicCard>
        </Box>
      </Box >
    </Box>
  );
};

export default SignUpForm;
