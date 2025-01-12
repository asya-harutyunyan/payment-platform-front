import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface IBasicCard {
  title?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export const BasicCard: React.FC<IBasicCard> = ({ title, children, sx }) => {
  return (
    <Card
      sx={{
        ...sx,
        backgroundColor: "#f5f5f5",
        minHeight: "300px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        "> div": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
        {title ?? ""}
      </Typography>
      <Box>{children}</Box>
    </Card>
  );
};
