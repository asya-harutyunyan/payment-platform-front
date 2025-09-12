import { AboutSection } from "@/components/atoms/landing-page/about";
import { AchievementsSection } from "@/components/atoms/landing-page/achievements";
import FaqSwiper from "@/components/atoms/landing-page/faq";
import { FeaturesSection } from "@/components/atoms/landing-page/featuresBlock";
// import FeaturesBlock from "@/components/atoms/landing-page/featuresBlock";
import { Footer } from "@/components/atoms/landing-page/footer";
import ResponsiveAppBar from "@/components/atoms/landing-page/header";
import { HowItWorks } from "@/components/atoms/landing-page/howItWorks";
import { Partners } from "@/components/atoms/landing-page/partners";
// import { useAuth } from "@/context/auth.context";
import { Box, Container } from "@mui/material";
// import { useNavigate } from "@tanstack/react-router";
// import { useCallback } from "react";
// import { EUserRole } from "../auth/sign-in-form/_services/useSignIn";

export const LandingPage = () => {
  // const navigate = useNavigate();

  // const { user } = useAuth();

  // const onBtnClick = useCallback(() => {
  //   let to = "/auth/sign-up";

  //   switch (user?.role) {
  //     case EUserRole.Client:
  //       to = "/my-information";
  //       break;
  //     case EUserRole.Admin:
  //     case EUserRole.SupportLead:
  //     case EUserRole.SupportOperator:
  //     case EUserRole.SupportTrainee:
  //     case EUserRole.TechnicalSpecialist:
  //       to = "/deposit-list";
  //       break;
  //     default:
  //       break;
  //   }
  //   navigate({
  //     to: to,
  //     replace: true,
  //   });
  // }, [navigate, user?.role]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fdfdfd" }}>
      <Container disableGutters maxWidth="xl" sx={{ m: "0", p: "0" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

          }}
        >
          <ResponsiveAppBar />

          <Box id={"why_choose_us"}>
            <AboutSection />
          </Box>
          <AchievementsSection />
          <HowItWorks />

          <Partners />
          <FeaturesSection />
          <FaqSwiper />


          {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant={"gradient"}
              text={t("get_start")}
              sx={{ width: "250px" }}
              onClick={onBtnClick}
            />
          </Box> */}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
