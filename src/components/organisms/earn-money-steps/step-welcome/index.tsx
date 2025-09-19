import Notebook from "@/assets/images/notebook.png";
import TelegramIcon from "@/assets/images/telegram_icon.svg";
import NewButton from "@/components/atoms/btn";
import { H1, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import ReactPlayer from "react-player";
export const StepWelcome = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "max-content",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box maxWidth={569} m="0 auto">
        <H1
          color="white"
          mb={{ xs: "16px", sm: "24px" }}
          fontSize={{ xs: "24px", sm: "40px" }}
          textAlign="center"
        >
          Добро пожаловать в <span style={{ fontStyle: "italic" }}>PayHub</span>
        </H1>
        <P
          textAlign="center"
          fontSize={{ xs: "14px", sm: "16px" }}
          color="white"
          mb="25px"
        >
          Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать можно легко, безопасно и выгодно.
        </P>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          maxWidth={{ xs: "100%", sm: "80%" }}
          gap="10px"
          margin="10px auto"
        >
          <Box flex={1}>
            <a
              href="https://t.me/payhubofficial"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", height: "100%" }}
            >
              <NewButton
                text="Телеграм-канал"
                icon={TelegramIcon}
                variant="outlinedBlue"
                sx={{
                  width: "100%",
                  height: "46px",
                  padding: "13px 16px",
                }}
              />
            </a>
          </Box>
          <Box flex={1}>
            <NewButton
              text="Начать Сейчас"
              variant="gradient"
              onClick={() => {
                navigate({ to: "/steps" });
              }}
              glow
              sx={{
                width: "100%",
                height: "46px",
                padding: "13px 16px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { lg: "80%", md: "80%", xs: "100%", sm: "100%" },
          maxWidth: "707px",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={Notebook}
          alt="Notebook"
          style={{
            width: "100%",
            borderRadius: "20px",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "12%",
            left: "18%",
            right: "18%",
            bottom: "20%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url="https://youtu.be/etz00cgQAzM"
            controls
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </Box>
  );
};
