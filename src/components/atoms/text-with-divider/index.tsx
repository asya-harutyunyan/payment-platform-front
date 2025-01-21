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
        justifyContent: "center",
        width: "100%",
        margin: "30px 0",
      }}
    >
      {children}
    </Box>
  );
};

export default TextWithDriver;
