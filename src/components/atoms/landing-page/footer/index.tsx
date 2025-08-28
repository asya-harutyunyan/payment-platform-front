import AndroidImg from "@/assets/images/android.png";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box } from "@mui/material";
import { FC } from "react";

interface IMediaCard {
  img?: string;
}
export const Footer: FC<IMediaCard> = () => {
  const downloadApk = async () => {
    try {
      fetch("/public/app-release.apk", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `app-release.apk`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode?.removeChild(link);
        });
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "180px",
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: {
          lg: "space-between",
          md: "space-between",
          xs: "center",
          sm: "center",
        },
        alignItems: "center",
        marginTop: "50px",
        flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
      }}
    >
      <P color="text.primary" paddingLeft={"50px"}>
        Terms and conditions | Privacy policy
      </P>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "end",
          marginRight: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            alignItems: "center",
          }}
        >
          <P
            sx={{
              paddingRight: "10px",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            Скачать приложение
          </P>
          <Box sx={{ paddingRight: "5px", cursor: "pointer" }}>
            {/* <IOSIcon /> */}
          </Box>
          <Box
            sx={{ paddingRight: "5px", cursor: "pointer" }}
            onClick={downloadApk}
          >
            <img
              src={AndroidImg}
              alt="android"
              style={{ width: "120px", borderRadius: "3px" }}
            />{" "}
          </Box>
        </Box>
      </Box>
      <Box
        width={"200px"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "50px",
          padding: { lg: "0", md: "", xs: "10px", sm: "10px" },
        }}
      >
        <LinkedInIcon sx={{ color: "text.secondary" }} />
        <InstagramIcon sx={{ color: "text.secondary" }} />
        <FacebookIcon sx={{ color: "text.secondary" }} />
        <TelegramIcon sx={{ color: "text.secondary", marginRight: "20px" }} />
      </Box>
    </Box>
  );
};
