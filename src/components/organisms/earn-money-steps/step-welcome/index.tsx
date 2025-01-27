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
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        justifyContent: "center",
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
          width: { lg: "80%", md: "80%", sx: "100%", sm: "100%" },
        }}
      >
        {t("about_me")}
      </P>
      <Box
        sx={{
          width: { lg: "80%", md: "80%", sx: "100%", sm: "100%" },
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=NR5IFPoRqmo"
          controls={true}
          width="100%"
          height="400px"
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
          text="Start Earning Money"
          sx={{ width: "350px", height: "55px" }}
          variant={"gradient"}
          onClick={() => {
            navigate({ to: "/deposit-info" });
          }}
        />
      </Box>
    </Box>
  );
};
