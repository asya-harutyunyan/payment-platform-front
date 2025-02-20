import theme from "@/styles/theme";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode, Ref, useEffect, useState } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

interface ISelectField<T extends FieldValues> extends UseControllerProps<T> {
  sx?: SxProps<Theme>;
  style?: SxProps<Theme>;
  placeholder: string;
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string;
  whiteVariant?: boolean;
  ref?: Ref<HTMLDivElement>;
  id?: string;
}
export const SelectField = <T extends FieldValues>({
  sx,
  style,
  placeholder,
  options,
  value: propValue,
  onChange,
  error = false,
  helperText,
  whiteVariant,
  id,
  ref,
}: ISelectField<T>) => {
  // Ensure a valid default value
  const defaultValue = options.length > 0 ? options[0].value : "";

  const [value, setValue] = useState<string | number>(
    propValue ?? defaultValue
  );

  // Ensure the default value is selected if no value is provided
  useEffect(() => {
    if (propValue === undefined || propValue === "") {
      setValue(defaultValue);
      onChange?.(defaultValue); // Notify parent about the default selection
    }
  }, [propValue, options, defaultValue, onChange]);

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const newValue = event.target.value as string | number;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <FormControl sx={{ ...sx, width: "100%" }} error={error}>
      <InputLabel
        id={id}
        sx={{
          color: whiteVariant ? "tertiary.main" : "primary.main",
          "&.MuiFormLabel-root": {
            color: whiteVariant ? "tertiary.main" : "primary.main",
          },
        }}
      >
        {placeholder}
      </InputLabel>
      <Select
        labelId={id}
        value={value} // ✅ Always has a valid value
        onChange={handleChange}
        label={placeholder}
        id={id}
        ref={ref}
        sx={{
          width: "100%",
          borderColor: whiteVariant ? "tertiary.main" : "primary.main",
          "& .MuiInputBase-input": {
            color: whiteVariant ? "tertiary.main" : "primary.main",
          },
          ...style,
          fieldset: {
            borderColor: whiteVariant
              ? `${theme.palette.tertiary.main}!important`
              : `${theme.palette.primary.main}!important`,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
