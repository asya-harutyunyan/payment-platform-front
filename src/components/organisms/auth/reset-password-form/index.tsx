import Circle1 from "@/assets/images/blue_circle_1.png";
import Circle2 from "@/assets/images/blue_circle_2.png";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { Colors } from "@/constants";
import { H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
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
        background: Colors.gradientBgSignIn,
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
            borderRadius: "40px",
            background: "rgba(255, 255, 255, 0.01)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            backgroundColor: "transparent",
            boxShadow: Colors.transparentBoxShadow,
            zIndex: "1",
            width: "60%",
          }}
        >
          <P
            maxWidth={457} m="0 auto"
            fontSize={{ xs: "24px", sm: "36px" }}
            paddingBottom="6px"
            fontWeight={600}
            color={Colors.white}
            width="max-content"
            margin="0 auto"
          >
            {t("reset_email_short")}
          </P>
          <H6 maxWidth={421} m="0 auto" textAlign="center">Введите вашу почту, и мы отправим вам ссылку для сброса пароля</H6>
          <FormTextInput
            control={control}
            name="email"
            placeholder={t("email")}
            greenGradientVariant
          />
          <NewButton
            variant={"gradient"}
            text={t("send_email")}
            sx={{ width: "100%", margin: "20px 0", height: "50px" }}
            type="submit"
          />
          <TextWithDivider>
            <P textAlign="center" fontSize="14px" fontWeight={500}>
              <Link
                to="/auth/sign-in"
                style={{
                  textDecoration: "none",
                  color: "white"
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
    </Box>
  );
};

export default ResetPasswordComponent;
