import theme from "@/styles/theme";
import { SxProps, Theme } from "@mui/material";
import DinamicButton from "@mui/material/Button";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import * as React from "react";

type ButtonVariant = "text" | "contained" | "outlined" | "gradient";
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
  type?: "submit" | "button";
  disabled?: boolean;
  gradient?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<DynamicButtonProps> = ({
  variant,
  text,
  sx,
  size,
  color,
  onClick,
  isLink = false,
  link,
  disabled,
  type,
}) => {
  return (
    <DinamicButton
      variant={variant}
      sx={{
        ...sx,
        minHeight: "40px",
        minWidth: "100px",
        textTransform: "capitalize",
      }}
      size={size}
      color={color}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
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
          {t(text)}
        </Link>
      )}
    </DinamicButton>
  );
};

export default Button;
