import { Theme } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  FC,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  ReactNode,
  Ref,
  useMemo,
  useState,
} from "react";

interface IBasicTextFields {
  sx?: SxProps<Theme>;
  style?: SxProps<Theme>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string;
  width?: string;
  whiteVariant?: boolean;
  greenGradientVariant?: boolean;
  lightGreyVariant?: boolean;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  autofocus?: boolean;
  padding?: string;
  borderRadius?: string | number;
}

export const BasicTextFields: FC<IBasicTextFields> = ({
  sx,
  style,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  whiteVariant,
  greenGradientVariant,
  lightGreyVariant,
  autofocus,
  width,
  id,
  ref,
  borderRadius,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const inputType = useMemo(() => {
    if (type !== "password") return type;
    return showPassword ? "text" : "password";
  }, [type, showPassword]);

  // Shared color decisions (kept simple & consistent)
  const borderCol =
    whiteVariant
      ? "tertiary.main"
      : greenGradientVariant
        ? "#1b939f"
        : lightGreyVariant
          ? "#EAEAEA"
          : "primary.main";

  const labelCol =
    whiteVariant
      ? "tertiary.main"
      : greenGradientVariant
        ? "white"
        : lightGreyVariant
          ? "#0082ef"
          : "primary.main";


  const textCol =
    whiteVariant
      ? "tertiary.main"
      : greenGradientVariant
        ? "white"
        : "primary.main";

  return (
    <Box sx={{ ...sx, "& > :not(style)": { mb: 1, mt: 1 }, width: "100%" }}>
      <TextField
        key={placeholder}
        label={placeholder}
        variant="outlined"
        type={inputType}
        ref={ref}
        id={id}
        autoFocus={autofocus}
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": { MozAppearance: "textfield" },
          width: width ?? "100%",
          border: "#B5BBC6",


          "& .MuiInputLabel-root": {
            fontSize: "14px",
            color: labelCol,
            top: "50%",
            transform: "translateY(-50%)",
            position: "absolute",
            pointerEvents: "none",
            ml: "16px",
            "&.Mui-focused": { color: labelCol },
          },
          "& .MuiInputLabel-shrink": {
            top: 0,
            left: "20px",
            transformOrigin: "top left",
            ml: 0,
          },


          ".MuiOutlinedInput-notchedOutline": {
            borderColor: borderCol,
          },


          ".MuiFormLabel-root": {
            fontSize: "12px",
            color: labelCol,
            "&.Mui-focused": { color: labelCol },
          },
          ".MuiInputBase-input": {
            color: textCol,
          },
          "& .MuiInputBase-input::placeholder, & .MuiOutlinedInput-input::placeholder": {
            color: textCol,
            opacity: 1,
          },


          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius ?? 8,


            backgroundColor: lightGreyVariant ? "#e3e3e3" : "transparent",
            boxShadow: lightGreyVariant ? "0 1px 0 0 #000" : "none",

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: borderCol,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: borderCol,
            },


            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "error.main",
            },
          },

          // Allow consumers to override last
          ...style,
        }}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        error={error}
        helperText={error ? helperText : ""}
        InputProps={{
          endAdornment:
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ color: greenGradientVariant ? "white" : "black" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
        }}
      />
    </Box>
  );
};
