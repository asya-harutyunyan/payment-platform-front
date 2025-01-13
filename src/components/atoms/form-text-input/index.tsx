import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FC, ReactNode } from "react";

interface IBasicTextFields {
  sx?: SxProps<Theme>;
  placeholder: string;
  type?: string; // Add support for input types (e.g., "text", "password", "email")
  leftIcon?: ReactNode; // Optional left adornment
  rightIcon?: ReactNode; // Optional right adornment
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string; // Allow customization of text color
}

export const BasicTextFields: FC<IBasicTextFields> = ({
  sx,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  textColor = "#000",
}) => {
  return (
    <Box sx={{ ...sx, "& > :not(style)": { mb: 1, mt: 1 }, width: "100%" }}>
      <TextField
        id="outlined-basic"
        label={placeholder}
        variant="outlined"
        type={type}
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
          startAdornment: leftIcon && (
            <InputAdornment position="start">{leftIcon}</InputAdornment>
          ),
          endAdornment: rightIcon && (
            <InputAdornment position="end">{rightIcon}</InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
