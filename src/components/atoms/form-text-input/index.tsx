import { Theme } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  FC,
  HTMLInputTypeAttribute,
  ReactNode,
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
  onBlur?: () => void;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string;
  whiteVariant?: boolean;
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
    <Box sx={{ ...sx, "& > :not(style)": { mb: 1, mt: 1 }, width: "100%" }}>
      <TextField
        key={placeholder}
        label={placeholder}
        variant="outlined"
        type={inputType}
        sx={{
          width: "100%",
          border: "#B5BBC6",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: whiteVariant ? "tertiary.main" : "primary.main",
          },
          ".MuiFormLabel-root": {
            color: whiteVariant ? "tertiary.main" : "primary.main",
            "&.Mui-focused": {
              color: whiteVariant ? "tertiary.main" : "primary.main",
            },
          },
          ".MuiInputBase-input": {
            color: whiteVariant ? "tertiary.main" : "primary.main",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: whiteVariant ? "tertiary.main" : "primary.main", // Change to your desired color
            },
          },
          ...style,
        }}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
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
