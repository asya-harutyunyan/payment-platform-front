import theme from "@/styles/theme";
import { H4, H5 } from "@/styles/typography";
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
  sub_title?: string | number;
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
        backgroundColor: {
          lg: bgColor ? "#f5f5f5" : "inherit",
          md: bgColor ? "#f5f5f5" : "inherit",
          xs: bgColor ? "#f5f5f5" : "inherit",
          sm: bgColor ? "#f5f5f5" : "inherit",
        },
        backgroundSize: "100% 100%",
        backgroundImage: {
          lg: `url(${bg})`,
          md: `url(${bg})`,
          xs: "none",
          sm: "none",
        },
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
        <H4
          sx={{
            color: "text.secondary",
            paddingRight: "10px",
            textAlign: { lg: "start", md: "start", xs: "center", sm: "center" },
          }}
        >
          {title ?? ""}
        </H4>
        {sub_title && (
          <Box
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              backgroundColor: theme.palette.tertiary.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <H4
              sx={{
                color: theme.palette.primary.main,
                textAlign: {
                  lg: "start",
                  md: "start",
                  xs: "center",
                  sm: "center",
                },
              }}
            >
              {sub_title}
            </H4>
          </Box>
        )}
      </span>
      {title_B ? (
        <H5
          sx={{
            color: "text.secondary",
            textAlign: { lg: "start", md: "start", xs: "center", sm: "center" },
          }}
        >
          {title_B ?? ""}
        </H5>
      ) : undefined}
      <Box>{children}</Box>
    </Box>
  );
};
