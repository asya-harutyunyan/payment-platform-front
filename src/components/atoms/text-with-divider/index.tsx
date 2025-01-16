import { Box } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

interface ITextWithDivider {
  children: ReactNode;
}
const TextWithDriver: FC<ITextWithDivider> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "30px 0",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          marginRight: "15px",
        }}
      />

      {children}

      <Box
        sx={{
          flex: 1,
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
    </Box>
  );
};

export default TextWithDriver;
