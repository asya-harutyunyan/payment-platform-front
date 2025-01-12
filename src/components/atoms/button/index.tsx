import theme from "@/styles/theme";
import { SxProps, Theme } from "@mui/material";
import DinamicButton from "@mui/material/Button";
import { Link } from "@tanstack/react-router";
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
  isLink?: boolean;
  link?: string;
}

const Button: React.FC<DynamicButtonProps> = ({
  variant,
  text,
  sx,
  size,
  color,
  isLink = false,
  link,
}) => {
  return (
    <DinamicButton
      variant={variant}
      sx={{
        ...sx,
        minHeight: "55px",
        minWidth: "100px",
        textTransform: "capitalize",
      }}
      size={size}
      color={color}
    >
      {!isLink ? (
        text
      ) : (
        <Link
          to={link ?? "/"}
          style={{
            color: theme.palette.secondary.main,
          }}
        >
          {text}
        </Link>
      )}
    </DinamicButton>
  );
};

export default Button;
