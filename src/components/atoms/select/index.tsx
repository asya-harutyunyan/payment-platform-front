import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode, Ref } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";

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
  value,
  onChange,
  error = false,
  helperText,
  whiteVariant,
  id,
  ref,
}: ISelectField<T>) => {
  return (
    <FormControl sx={{ ...sx, width: "100%" }} error={error}>
      <InputLabel id={id}>{placeholder}</InputLabel>
      <Select
        labelId={id}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
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

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { label: string; value: string | number }[];
  placeholder: string;
  error?: boolean;
  helperText?: string | ReactNode;
}

export const SelectFieldWithHookForm = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  error,
  helperText,
}: SelectFieldWithHookFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectField
          {...field}
          placeholder={placeholder}
          options={options}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
