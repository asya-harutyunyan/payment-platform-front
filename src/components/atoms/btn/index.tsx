import { H6 } from "@/styles/typography";
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
  | "error"
  | "error_background";
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
  variant?: ButtonVariant;
  color?: Colors;
  text: string;
  sx?: SxProps<Theme>;
  size?: Sizes;
  glow?: boolean;
  type?: "submit" | "button";
  disabled?: boolean;
  gradient?: boolean;
  icon?: React.ElementType<SvgIconProps> | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NewButton: React.FC<DynamicButtonProps> = ({
  variant,
  text,
  sx,
  size,
  color,
  onClick,
  disabled,
  type,
  glow,
  icon: Icon,
}) => {
  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return (
        <img
          src={Icon}
          alt=""
          style={{ width: 24, height: 24, display: "block" }}
        />
      );
    }
    const Comp = Icon;
    return <Comp fontSize="small" />;
  };

  return (
    <DinamicButton
      variant={variant === "gradient" ? "contained" : variant}
      disableElevation
      sx={{
        minHeight: "46px",
        padding: "12px 28px",
        borderRadius: "56px",
        textTransform: "capitalize",
        transition: "transform 0.1s ease",
        position: "relative",
        overflow: "visible",
        background:
          variant === "gradient"
            ? "linear-gradient(180deg, #0062E0 0%, #00A6FF 100%)"
            : undefined,
        "&.Mui-disabled": {
          color: "#0055C2",
        },

        ...(variant === "outlinedBlue" && {
          border: "1px solid #0062E0",
          color: "#fff",
          backgroundColor: "transparent",
          "&:hover": {
            border: "1.5px solid #22b4be",
            backgroundColor: "transparent",
          },
        }),
        ...(glow && {
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-5px",
            right: "-5px",
            width: "50px",
            height: "50px",
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,166,255,1) 0%, rgba(0,166,255,0.85) 30%, rgba(0,166,255,0.6) 55%, rgba(0,166,255,0.4) 75%, rgba(0,166,255,0) 90%)",
            filter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 0,
          },
        }),
        ...sx,
      }}
      size={size}
      color={color}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          gap: 6,
        }}
      >
        {renderIcon()}
        <H6 sx={{ padding: 0, lineHeight: "18px", color: "inherit" }}>
          {text}
        </H6>
      </div>
    </DinamicButton>
  );
};

export default NewButton;
