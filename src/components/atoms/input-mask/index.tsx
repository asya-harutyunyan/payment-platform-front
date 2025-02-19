import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import IMask from "imask";
import { useEffect, useRef } from "react";

interface CreditCardInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  error: boolean;
  helperText?: string;
  whiteVariant?: boolean;
}

const CreditCardInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  whiteVariant,
  helperText,
}: CreditCardInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: "0000 0000 0000 0000",
        blocks: {
          0: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 9,
          },
          " ": {
            mask: " ",
            lazy: false,
          },
        },
        prepare: (value: string) => value.replace(/\D/g, ""),
      });

      return () => {
        mask.destroy();
      };
    }
  }, []);

  return (
    <FormControl fullWidth error={error} sx={{ mb: 2 }}>
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || "1234 1234 1234 1234"}
        label="Номер кредитной карты"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">💳</InputAdornment>,
        }}
        sx={{
          backgroundColor: "transparent",
          color: whiteVariant ? "#D9D9D9!important" : "#0E1D40!important",
          borderRadius: "4px",
          letterSpacing: "2px",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: whiteVariant ? "#D9D9D9" : "#0E1D40",
            },
            "&:hover fieldset": {
              borderColor: whiteVariant ? "#D9D9D9" : "#0E1D40",
            },
            "&.Mui-focused fieldset": {
              borderColor: whiteVariant ? "#D9D9D9" : "#0E1D40",
            },
            "& .MuiInputBase-input": {
              color: whiteVariant ? "#D9D9D9!important" : "#0E1D40!important",
            },
          },
          label: {
            color: whiteVariant ? "#D9D9D9!important" : "#0E1D40!important",
          },
        }}
      />
      {helperText && error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CreditCardInput;
