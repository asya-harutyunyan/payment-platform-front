import { SxProps, Theme } from "@mui/material";
import DinamicButton from "@mui/material/Button";
import * as React from "react";

type ButtonVariant = "text" | "contained" | "outlined";
type Sizes = "small" | "medium" | "large";
type Colors =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
interface DynamicButtonProps {
  variant: ButtonVariant;
  color?: Colors;
  text: string;
  sx?: SxProps<Theme>;
  size?: Sizes;
}

const Button: React.FC<DynamicButtonProps> = ({
  variant,
  text,
  sx,
  size,
  color,
}) => {
  return (
    <DinamicButton
      variant={variant}
      sx={{ ...sx, height: "40px", minWidth: "100px" }}
      size={size}
      color={color}
    >
      {text}
    </DinamicButton>
  );
};

export default Button;
