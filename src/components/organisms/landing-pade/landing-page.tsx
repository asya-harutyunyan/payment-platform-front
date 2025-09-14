import { AboutSection } from "@/components/atoms/landing-page/about";
import { AchievementsSection } from "@/components/atoms/landing-page/achievements";
import FaqSwiper from "@/components/atoms/landing-page/faq";
import { FeaturesSection } from "@/components/atoms/landing-page/featuresBlock";
import { Footer } from "@/components/atoms/landing-page/footer";
import ResponsiveAppBar from "@/components/atoms/landing-page/header";
import { HowItWorks } from "@/components/atoms/landing-page/howItWorks";
import { Partners } from "@/components/atoms/landing-page/partners";
import { Box, Container } from "@mui/material";


export const LandingPage = () => {
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
          {/* <ResponsiveAppBar /> */}
          <AboutSection />
          <AchievementsSection />
          <HowItWorks />
          <Partners />
          <FeaturesSection />
          <FaqSwiper />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
