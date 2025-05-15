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
  nameKey?: string;
  height?: string;
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
  nameKey,
  height,
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
          nameKey={nameKey}
          error={error}
          helperText={helperText}
          sx={{
            alignItems: "center",
            "& .MuiInputBase-root": {
              height: height ?? "inherit",
              boxSizing: "border-box",
              textTransform: "capitalize",
            },
          }}
        />
      )}
    />
  );
};
