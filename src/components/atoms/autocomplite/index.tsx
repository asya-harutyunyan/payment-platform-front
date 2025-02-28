import { Autocomplete, TextField } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { id: string | number; name: string }[];
  placeholder: string;
  error?: boolean;
  helperText?: string | ReactNode;
  whiteVariant?: boolean;
  defaultValueFirst?: boolean;
}

export const Autocomplite = <T extends FieldValues>({
  name,
  control,
  options,
  whiteVariant,
  placeholder,
  error,
  helperText,
}: SelectFieldWithHookFormProps<T>) => {
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
            "& .MuiInputBase-input": {
              color: whiteVariant ? "tertiary.main" : "primary.main",
            },
            fieldset: {
              borderColor: whiteVariant ? "tertiary.main" : "primary.main",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={placeholder}
              error={error}
              helperText={helperText}
              sx={{
                borderColor: whiteVariant ? "tertiary.main" : "primary.main",
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
