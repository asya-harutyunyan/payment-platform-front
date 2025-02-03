import logo from "@/assets/images/logo.png";
import { Box } from "@mui/material";

export const Logo = () => {
  return (
    <Box
      sx={{
        width: "50px",
        height: "50px",
      }}
    >
      <img src={logo} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};
