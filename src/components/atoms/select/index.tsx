import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SelectField } from "./select_component";

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { label: string; value: string | number }[];
  placeholder: string;
  error?: boolean;
  helperText?: string | ReactNode;
  whiteVariant?: boolean;
}

export const SelectFieldWith = <T extends FieldValues>({
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
        <SelectField
          {...field}
          whiteVariant={whiteVariant}
          placeholder={placeholder}
          options={options}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
