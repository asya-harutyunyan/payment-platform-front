import { Autocomplete, TextField } from "@mui/material";
import { CSSProperties, ReactNode, useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";
import { ISelectOption } from "../select/select_component";

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: ISelectOption[];
  placeholder: string;
  error?: boolean;
  lightGreyVariant?: boolean;
  helperText?: string | ReactNode;
  defaultValue?: T[FieldPath<T>];
  valueKey?: keyof ISelectOption;
  whiteVariant?: boolean;
  defaultValueFirst?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

export const Autocomplite = <T extends FieldValues>({
  disabled,
  name,
  control,
  options,
  whiteVariant,
  placeholder,
  defaultValue,
  lightGreyVariant,
  style,
  error,
  ...props
}: SelectFieldWithHookFormProps<T>) => {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
    ...props,
  });

  const helperText = useMemo(() => {
    if (fieldState.invalid && fieldState.error?.message) {
      return fieldState.error.message;
    }
    return undefined;
  }, [fieldState.error?.message, fieldState.invalid]);

  const isError = error || fieldState.invalid;

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
  const helperTextColor = isError ? "#d32f2f" : "inherit";

  const onItemSelect = (_event: React.SyntheticEvent, value: unknown) => {
    field.onChange(value);
  };

  return (
    <Autocomplete
      {...field}
      disablePortal
      options={options}
      disabled={disabled}
      value={field.value || null}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      getOptionLabel={(option) => option.name ?? ""}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          backgroundColor: lightGreyVariant ? "#e3e3e3" : "transparent",
          boxShadow: lightGreyVariant ? "0 1px 0 0 #000" : "none",
          borderRadius: 8,

          "& fieldset": { borderColor: borderColor },
          "&:hover fieldset": { borderColor: borderColor },
          "&.Mui-focused fieldset": { borderColor: borderColor },
        },

        "& .MuiFormLabel-root": {
          color: labelColor,
        },
        "& .MuiInputBase-input": {
          color: textColor,
        },

        color: textColor,

        fieldset: { borderColor: borderColor },
        label: { color: labelColor },
        svg: {
          color: textColor, // caret/arrow icon
        },

        ...style,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          error={error}
          helperText={helperText}
          sx={{
            // ensure the inner TextField mirrors the same variant styles
            "& .MuiOutlinedInput-root": {
              backgroundColor: lightGreyVariant ? "#e3e3e3" : "transparent",
              boxShadow: lightGreyVariant ? "0 1px 0 0 #000" : "none",
              borderRadius: 8,

              "& fieldset": { borderColor: borderColor },
              "&:hover fieldset": { borderColor: borderColor },
              "&.Mui-focused fieldset": { borderColor: borderColor },
            },
            "& .MuiFormLabel-root": {
              color: labelColor,
              fontSize: "12px",
            },
            "& .MuiInputBase-input": {
              color: textColor,
            },
            "& .MuiFormHelperText-root": {
              color: helperTextColor,
            },
          }}
        />
      )}
      onChange={onItemSelect}
    />
  );
};
