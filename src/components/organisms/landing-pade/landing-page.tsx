import firstCard from "@/assets/images/first-card.png";
import secondCard from "@/assets/images/middle.png";
import thirdCard from "@/assets/images/third-card.png";
import { AboutSection } from "@/components/atoms/landing-page/about";
import { MediaCard } from "@/components/atoms/landing-page/cards";
import FAQs from "@/components/atoms/landing-page/faq";
import { Footer } from "@/components/atoms/landing-page/footer";
import ResponsiveAppBar from "@/components/atoms/landing-page/header";
import { H2 } from "@/styles/typography";
import { Box } from "@mui/material";
import Features from "../../atoms/landing-page/why-choose-payhub";

export const LandingPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: { lg: "0 100px", md: "0 100px", xs: "20px", sm: "20px" },
        }}
      >
        <AboutSection />

        <H2 color="primary.main" align="center">
          How It Works ??
        </H2>

        <Box
          sx={{
            display: "flex",
            margin: "50px 0",
            justifyContent: {
              lg: "space-between",
              md: "space-between",
              xs: "center",
              sm: "center",
            },
            alignItems: {
              lg: "start",
              md: "start",
              xs: "center",
              sm: "center",
            },
            flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          }}
        >
          <MediaCard img={firstCard} />
          <MediaCard img={secondCard} />
          <MediaCard img={thirdCard} />
        </Box>
        <Features />
        <H2 color="primary.main" align="center" sx={{ paddingBottom: "50px" }}>
          Frequently Asked Questions
        </H2>
        <FAQs />
      </Box>
      <Footer />
    </Box>
  );
};
