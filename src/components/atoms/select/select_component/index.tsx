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
import { t } from "i18next";
import { ReactNode, Ref, useMemo, useState } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface ISelectOption {
  id: string | number;
  name: string;
  nameKey?: string;
}

interface ISelectField<T extends FieldValues> extends UseControllerProps<T> {
  sx?: SxProps<Theme>;
  style?: SxProps<Theme>;
  placeholder: string;
  options: ISelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string;
  whiteVariant?: boolean;
  lightGreyVariant?: boolean;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  defaultValueFirst?: boolean;
  valueKey?: keyof ISelectOption;
  nameKey?: string;
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
  lightGreyVariant,
  defaultValueFirst,
  id,
  ref,
  valueKey,
  nameKey,
}: ISelectField<T>) => {
  const initialDefault = useMemo(() => {
    if (!defaultValueFirst || !options?.length) return propValue ?? "";
    const first = options[0];
    return (valueKey ? (first as any)[valueKey] : first.name) ?? propValue ?? "";
  }, [defaultValueFirst, options, propValue, valueKey]);

  const [value, setValue] = useState<string | number>(initialDefault);

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const newValue = event.target.value as string | number;
    setValue(newValue);
    onChange?.(newValue);
  };

  const isError = !!error;

  const borderColor = isError
    ? "#d32f2f"
    : whiteVariant
      ? "tertiary.main"
      : lightGreyVariant
        ? "#EAEAEA"
        : "primary.main";

  const labelColor = whiteVariant
    ? "tertiary.main"
    : lightGreyVariant
      ? "#0082ef"
      : "primary.main";

  const textColor = whiteVariant ? "tertiary.main" : "primary.main";

  return (
    <FormControl sx={{ ...sx, width: "100%" }} error={isError}>
      <InputLabel
        id={id}
        sx={{
          color: labelColor,
          "&.Mui-focused": { color: labelColor },
        }}
      >
        {placeholder}
      </InputLabel>
      <Select
        labelId={id}
        value={value}
        onChange={handleChange}
        label={placeholder}
        id={id}
        ref={ref}
        MenuProps={{
          PaperProps: {
            sx: {
              background: "linear-gradient(180deg, #6BADFC 0%, #041F44 100%)",
              "& .MuiMenuItem-root": {
                color: "white",
                backgroundColor: "transparent",
                "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
                  backgroundColor: "#76a4dd",
                  borderBottom: "1px solid white",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "#76a4dd",
                  borderBottom: "1px solid white",
                  color: "white",
                },
              },
            },
          },
        }}
        sx={{
          width: "100%",
          "&.MuiOutlinedInput-root": {
            backgroundColor: lightGreyVariant ? "#e3e3e3" : "transparent",
            boxShadow: lightGreyVariant ? "0 1px 0 0 #000" : "none",
            borderRadius: 8,
            "& .MuiOutlinedInput-notchedOutline": { borderColor },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor },
          },
          "& .MuiSelect-select": {
            color: textColor,
            textTransform: "none",
          },
          "& .MuiSelect-icon": { color: textColor },
          ...(lightGreyVariant
            ? {}
            : {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: error
                    ? `${theme.palette.error.main}!important`
                    : whiteVariant
                      ? `${theme.palette.tertiary.main}!important`
                      : `${theme.palette.primary.main}!important`,
                },
              }),
          ...style,
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={valueKey ? (option as any)[valueKey] : option.name}
            sx={{ textTransform: "capitalize" }}
          >
            {nameKey ? (option as any)[nameKey] : t(option.name)}
          </MenuItem>
        ))}
      </Select>

      {isError && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
