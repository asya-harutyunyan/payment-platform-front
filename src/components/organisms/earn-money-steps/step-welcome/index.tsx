import Button from "@/components/atoms/button";
import theme from "@/styles/theme";
import { H1, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import ReactPlayer from "react-player";

export const StepWelcome = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: {
          lg: "80vh",
          md: "80vh",
          xs: "max-content",
          sm: "max-content",
        },
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <H1
        color={theme.palette.primary.main}
        paddingBottom={"30px"}
        padding={"0 0 20px 0"}
      >
        {t("welcome")}
      </H1>
      <P
        color={theme.palette.primary.main}
        paddingBottom={4}
        sx={{
          fontSize: "16px",
          width: { lg: "80%", md: "80%", xs: "100%", sm: "100%" },
        }}
      >
        {t("about_me")}
      </P>
      <Box
        sx={{
          width: { lg: "80%", md: "80%", xs: "100%", sm: "100%" },
          borderRadius: "20px",
          height: { lg: "380px", md: "380px", xs: "280px", sm: "280px" },
          overflow: "hidden",
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=NR5IFPoRqmo"
          controls={true}
          width="100%"
          height="100%"
          borderRadius={"10px"}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "80%", md: "80%", sx: "100%", sm: "100%" },
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <Button
          text={t("start_earning_money")}
          sx={{ width: "350px", height: "55px" }}
          variant={"gradient"}
          onClick={() => {
            navigate({ to: "/steps" });
          }}
        />
      </Box>
    </Box>
  );
};
