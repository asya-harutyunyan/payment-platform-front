import theme from "@/styles/theme";
import { H4 } from "@/styles/typography";
import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

interface IBasicCard {
  title?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  bg?: string;
  bgColor?: boolean;
  title_B?: string;
  sub_title?: string;
}
export const BasicCard: React.FC<IBasicCard> = ({
  title,
  title_B,
  sub_title,
  children,
  sx,
  bg,
  bgColor = "true",
}) => {
  return (
    <Box
      sx={{
        ...sx,
        backgroundColor: bgColor ? "#f5f5f5" : "inherit",
        backgroundSize: "100% 100%",
        backgroundImage: `url(${bg})`,
        minHeight: "280px",
        borderRadius: "5px",
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        padding: "40px",
        "> div": {
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        },
      }}
    >
      <span style={{ display: "flex" }}>
        <H4 sx={{ color: "text.secondary", paddingRight: "10px" }}>
          {title ?? ""}
        </H4>
        {sub_title && (
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: theme.palette.tertiary.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <H4 sx={{ color: theme.palette.primary.main }}>{sub_title}</H4>
          </Box>
        )}
      </span>
      {title_B ? (
        <H4 sx={{ color: "text.secondary" }}>{title_B ?? ""}</H4>
      ) : undefined}
      <Box>{children}</Box>
    </Box>
  );
};
