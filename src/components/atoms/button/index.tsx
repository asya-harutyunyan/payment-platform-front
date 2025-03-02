import { SvgIconProps, SxProps, Theme } from "@mui/material";
import DinamicButton from "@mui/material/Button";
import * as React from "react";

type ButtonVariant =
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "outlinedWhite"
  | "outlinedBlue"
  | "error";
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
  type?: "submit" | "button";
  disabled?: boolean;
  gradient?: boolean;
  icon?: React.ElementType<SvgIconProps>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<DynamicButtonProps> = ({
  variant,
  text,
  sx,
  size,
  color,
  onClick,

  disabled,
  type,
  icon: Icon,
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
      <div style={{ display: "flex", alignItems: "center" }}>
        {Icon && <Icon fontSize="small" />}
        <div style={{ paddingLeft: "5px" }}>{text}</div>
      </div>
    </DinamicButton>
  );
};

export default Button;
