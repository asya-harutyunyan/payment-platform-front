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
  return (
    <Box
      sx={{
        width: "100%",
        height: "180px",
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "50px",
        flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
      }}
    >
      <P color="text.primary" paddingLeft={"50px"}>
        Terms and conditions | Privacy policy
      </P>
      <Box
        width={"200px"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "50px",
        }}
      >
        <LinkedInIcon sx={{ color: "text.secondary" }} />
        <InstagramIcon sx={{ color: "text.secondary" }} />
        <FacebookIcon sx={{ color: "text.secondary" }} />
        <TelegramIcon sx={{ color: "text.secondary" }} />
      </Box>
    </Box>
  );
};
