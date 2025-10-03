import { H4, H5 } from "@/styles/typography";
import { SxProps, Theme, Typography } from "@mui/material";
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
  align?: string;
  fullWidth?: boolean; // ✅ added
}

export const BasicCard: React.FC<IBasicCard> = ({
  title,
  title_B,
  sub_title,
  align,
  children,
  sx,
  bg,
  bgColor,
  fullWidth, // ✅ destructure it
}) => {
  return (
    <Box
      sx={{
        backgroundColor: {
          lg: bgColor ? "#f5f5f5" : "primary.main",
          md: bgColor ? "#f5f5f5" : "primary.main",
          xs: bgColor ? "#f5f5f5" : "primary.main",
          sm: bgColor ? "#f5f5f5" : "primary.main",
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
        flexDirection: "column",
        padding: "40px",
        "> div": {
          display: "flex",
          flexDirection: "column",
          alignItems: align ? align : "start",
        },
        ...sx,
      }}
    >
      {title && (
        <Typography
          sx={{
            display: "flex",
            textAlign: {
              lg: "start",
              md: "start",
              xs: "center",
              sm: "center",
            },
          }}
        >
          <H4
            sx={{
              color: "text.secondary",
              paddingRight: "10px",
              textAlign: {
                lg: "start",
                md: "start",
                xs: "center",
                sm: "center",
              },
              fontSize: {
                lg: "1.5rem",
                md: "1.5rem",
                xs: "1.2rem",
                sm: "1.2rem",
              },
            }}
          >
            {title ?? ""}
          </H4>
          {sub_title && (
            <H4
              sx={{
                color: "text.secondary",
                textAlign: {
                  lg: "start",
                  md: "start",
                  xs: "center",
                  sm: "center",
                },
                fontSize: {
                  lg: "1.5rem",
                  md: "1.5rem",
                  xs: "1.2rem",
                  sm: "1.2rem",
                },
              }}
            >
              {sub_title}
            </H4>
          )}
        </Typography>
      )}

      {title_B ? (
        <H5
          sx={{
            color: "text.secondary",
            textAlign: { lg: "start", md: "start", xs: "center", sm: "center" },
          }}
        >
          {title_B ?? ""}
        </H5>
      ) : null}

      {/* ✅ Fix applied here */}
      <Box sx={{ width: fullWidth ? "100%" : "auto" }}>{children}</Box>
    </Box>
  );
};
