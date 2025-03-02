import { Autocomplete, TextField } from "@mui/material";
import { ReactNode, useMemo } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { id: string | number; name: string }[];
  placeholder: string;
  error?: boolean;
  helperText?: string | ReactNode;
  defaultValue?: T[FieldPath<T>];

  whiteVariant?: boolean;
  defaultValueFirst?: boolean;
}

export const Autocomplite = <T extends FieldValues>({
  name,
  control,
  options,
  whiteVariant,
  placeholder,
  defaultValue,
  error,
  ...props
}: SelectFieldWithHookFormProps<T>) => {
  const { fieldState } = useController<T>({
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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          disablePortal
          options={options.map((option) => option.name)}
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
              color: whiteVariant ? "tertiary.main" : "primary.main", // Keep label color unchanged
            },
            "& .MuiInputBase-input": {
              color: whiteVariant ? "tertiary.main" : "primary.main", // Keep input text color unchanged
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
                  color: helperTextColor, // Red color for helper text on error
                },
              }}
            />
          )}
          onChange={(_, newValue) => field.onChange(newValue)}
          value={field.value}
        />
      )}
    />
  );
};
