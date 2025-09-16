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
  autofocus,
  width,
  id,
  ref,
  borderRadius
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const inputType = useMemo(() => {
    if (type !== "password") {
      return type;
    }
    return showPassword ? "text" : "password";
  }, [type, showPassword]);

  return (
    <Box sx={{ ...sx, "& > :not(style)": { mb: 1, mt: 1 }, width: "100%" }} >
      <TextField
        key={placeholder}
        label={placeholder}
        variant="outlined"
        type={inputType}
        ref={ref}
        id={id}
        autoFocus={autofocus}

        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          ":-internal-autofill-selected": {
            backgroundColor: "red !important",
          },
          width: width ?? "100%",
          border: "#B5BBC6",

          ".MuiOutlinedInput-notchedOutline": {
            borderColor: whiteVariant ? "tertiary.main" : greenGradientVariant ? "#1b939f" : "primary.main",
          },

          "& .MuiInputLabel-root": {
            fontSize: "14px",
            color: whiteVariant
              ? "tertiary.main"
              : greenGradientVariant
                ? "white"
                : "primary.main",
            top: "50%",
            transform: "translateY(-50%)",
            position: "absolute",
            pointerEvents: "none",
            ml: "16px",

            "&.Mui-focused": {
              color: whiteVariant
                ? "tertiary.main"
                : greenGradientVariant
                  ? "white"
                  : "primary.main",
            },
          },

          "& .MuiInputLabel-shrink": {
            top: 0,
            left: "20px",
            transform: "translate(0, -4px) scale(0.75)",
            transformOrigin: "top left",
            ml: "0"
          },

          ".MuiFormLabel-root": {
            fontSize: "12px",
            color: whiteVariant ? "tertiary.main" : greenGradientVariant ? "white" : "primary.main",
            "&.Mui-focused": {
              color: whiteVariant ? "tertiary.main" : greenGradientVariant ? "white" : "primary.main",
            },
          },
          ".MuiInputBase-input": {
            color: whiteVariant ? "tertiary.main" : greenGradientVariant ? "white" : "primary.main",
          },

          "& .MuiInputBase-input::placeholder, & .MuiOutlinedInput-input::placeholder": {
            color: whiteVariant ? "tertiary.main" : greenGradientVariant ? "white" : "primary.main",
            opacity: 1,
          },

          "&:input:-internal-autofill-selected": {
            backgroundColor: !whiteVariant ? "tertiary.main" : "primary.main",
          },

          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius ?? 8,

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: whiteVariant ? "tertiary.main" : greenGradientVariant ? "#1b939f" : "primary.main",
            },


            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: whiteVariant ? "tertiary.main" : greenGradientVariant ? "#1b939f" : "primary.main",
            },
          },
          ...style,
        }}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        error={error}
        helperText={error ? helperText : ""}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                sx={{
                  color: greenGradientVariant ? "white" : "black"
                }}
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
