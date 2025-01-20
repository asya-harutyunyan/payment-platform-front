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
}

export const BasicTextFields: FC<IBasicTextFields> = ({
  sx,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  textColor = "#000",
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
        id="outlined-basic"
        label={placeholder}
        variant="outlined"
        type={inputType}
        sx={{
          width: "100%",
          border: "#B5BBC6",
          ".MuiFormLabel-root": {
            color: "#B5BBC6",
          },
          ".MuiInputBase-input": {
            color: textColor,
          },
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
