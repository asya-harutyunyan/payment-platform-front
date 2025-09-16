import logo from "@/assets/images/logo.png";
import { Box } from "@mui/material";

interface LogoProps {
  width?: string;
  height?: string;
}

export const Logo: React.FC<LogoProps> = ({ width = "50px", height = "50px" }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
      }}
    >
      <img src={logo} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};
