import { H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { t } from "i18next";
import { FC } from "react";

interface IMediaCard {
  img?: string;
  title: string;
  description: string;
}
export const MediaCard: FC<IMediaCard> = ({ img, title, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "28%",
        height: "420px",
        backgroundImage: "linear-gradient(to right, #2982FF,  #041F44)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "17px",
        margin: { lg: "0", md: "0", xs: "30px 0", sm: "30px 0" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia sx={{ height: "120px", width: "120px" }} image={img} />
      </Box>

      <CardContent
        sx={{
          width: "82%",
          height: "80%",
          background: "white",
          borderRadius: "17px",
          marginBottom: "15px",
        }}
      >
        <H6 color="primary.main" sx={{ padding: "0 0 5px 0" }}>
          {t(title)}
        </H6>
        <P color="primary.main" fontSize={"14px"}>
          {t(description)}
        </P>
      </CardContent>
    </Card>
  );
};
