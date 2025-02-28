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
import { ReactNode, Ref, useState } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

interface ISelectField<T extends FieldValues> extends UseControllerProps<T> {
  sx?: SxProps<Theme>;
  style?: SxProps<Theme>;
  placeholder: string;
  options: { id: string | number; name: string }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: boolean;
  helperText?: string | ReactNode;
  textColor?: string;
  whiteVariant?: boolean;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  defaultValueFirst?: boolean;
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
  defaultValueFirst,
  id,
  ref,
}: ISelectField<T>) => {
  const [value, setValue] = useState<string | number>(
    defaultValueFirst ? (options[0]?.name ?? propValue) : ""
  );

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
        value={value}
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
          svg: {
            color: "white",
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
          <MenuItem key={option.id} value={option.name}>
            {t(option.name)}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
