import { Autocomplete, TextField } from "@mui/material";
import { ReactNode, useMemo } from "react";
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
  helperText?: string | ReactNode;
  defaultValue?: T[FieldPath<T>];
  valueKey?: keyof ISelectOption;
  whiteVariant?: boolean;
  defaultValueFirst?: boolean;
  disabled?: boolean;
}

export const Autocomplite = <T extends FieldValues>({
  disabled,
  name,
  control,
  options,
  whiteVariant,
  placeholder,
  defaultValue,
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

  const borderColor =
    error || fieldState.invalid
      ? "#d32f2f"
      : whiteVariant
        ? "tertiary.main"
        : "primary.main";
  const helperTextColor = error || fieldState.invalid ? "#d32f2f" : "inherit";

  const onItemSelect = (event: React.SyntheticEvent, value: unknown) => {
    field.onChange(value);
  };

  return (
    <Autocomplete
      {...field}
      disablePortal
      options={options}
      disabled={disabled}
      value={field.value || null}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
      getOptionLabel={(option) => option.name ?? ""}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor,
          },
          "&:hover fieldset": {
            borderColor,
          },
          "&.Mui-focused fieldset": {
            borderColor,
          },
        },
        "& .MuiFormLabel-root": {
          color: whiteVariant ? "tertiary.main" : "primary.main",
        },
        "& .MuiInputBase-input": {
          color: whiteVariant ? "tertiary.main" : "primary.main",
        },
        color: whiteVariant ? "tertiary.main" : "primary.main",
        fieldset: {
          borderColor,
        },
        label: { color: whiteVariant ? "tertiary.main" : "primary.main" },
        svg: {
          color: "white",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          error={error}
          helperText={helperText}
          sx={{
            borderColor,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor,
              },
              "&:hover fieldset": {
                borderColor,
              },
              "&.Mui-focused fieldset": {
                borderColor,
              },
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
