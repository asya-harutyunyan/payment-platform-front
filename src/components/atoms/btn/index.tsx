import { H6 } from "@/styles/typography";
import { SvgIconProps, SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";

type ButtonVariant =
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "outlinedWhite"
  | "outlinedBlue"
  | "outlinedGreen"
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

  const muiVariant: "text" | "contained" | "outlined" = (() => {
    if (
      variant === "gradient" ||
      variant === "error" ||
      variant === "error_background"
    ) {
      return "contained";
    }
    if (
      variant === "outlinedWhite" ||
      variant === "outlinedBlue" ||
      variant === "outlinedGreen"
    ) {
      return "outlined";
    }
    return (variant as "text" | "contained" | "outlined") ?? "contained";
  })();

  return (
    <Button
      variant={muiVariant}
      disableElevation
      sx={{
        minHeight: "46px",
        padding: "12px 28px",
        borderRadius: "56px",
        textTransform: "capitalize",
        transition: "transform 0.1s ease",
        position: "relative",
        overflow: "visible",

        ...(variant === "gradient" && {
          background: "linear-gradient(180deg, #0062E0 0%, #00A6FF 100%)",

          "&:hover": {
            background: "linear-gradient(180deg, #0062E0 0%, #0062E0 100%)",
          },

          "&.Mui-disabled": {
            color: "#0055C2",
          },
        }),

        ...(variant === "outlinedBlue" && {
          border: "1px solid #0062E0",
          color: "#fff",
          backgroundColor: "transparent",
          "&:hover": {
            border: "1.5px solid #22b4be",
            backgroundColor: "transparent",
          },
        }),

        ...(variant === "outlinedGreen" && {
          borderRadius: "56px",
          border: "2px solid transparent",
          background:
            "linear-gradient(to bottom, #eaeaea 0 2px, #eaeaea 2px 100%) padding-box," +
            "linear-gradient(to bottom, #528fb3, #23c6ca) border-box",
          color: "#0c5cca",
          "&:hover": {
            background:
              "linear-gradient(to bottom, #F2F2F2 0 2px, #F2F2F2 2px 100%) padding-box," +
              "linear-gradient(to bottom, #528fb3, #23c6ca) border-box",
          },
        }),

        ...(variant === "error" && {
          backgroundColor: "#D32F2F",
          "&:hover": { backgroundColor: "#B71C1C" },
        }),
        ...(variant === "error_background" && {
          backgroundColor: "rgba(211, 47, 47, 0.1)",
          color: "#D32F2F",
          "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.15)" },
        }),

        "&.Mui-disabled": {
          color: "#ccc",
        },

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
    </Button>
  );
};

export default NewButton;
