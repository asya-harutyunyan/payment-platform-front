import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ISelectOption, SelectField } from "./select_component";

interface SelectFieldWithHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: ISelectOption[];
  placeholder: string;
  error?: boolean;
  helperText?: string | ReactNode;
  whiteVariant?: boolean;
  defaultValueFirst?: boolean;
  valueKey?: keyof ISelectOption;
}

export const SelectFieldWith = <T extends FieldValues>({
  name,
  control,
  options,
  whiteVariant,
  placeholder,
  defaultValueFirst,
  error,
  helperText,
  valueKey,
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
          defaultValueFirst={defaultValueFirst}
          options={options}
          valueKey={valueKey}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
