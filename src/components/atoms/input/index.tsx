import { Box, SxProps } from "@mui/material";
import { ReactNode, useMemo } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { BasicTextFields } from "../form-text-input";
import CreditCardInput from "../input-mask";

interface IFormTextInput<T extends FieldValues> extends UseControllerProps<T> {
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  type?: string;
  style?: SxProps;
  isPassword?: boolean;
  width?: string;
  whiteVariant?: boolean;
  mask?: boolean;
  autofocus?: boolean;
  numeric?: boolean;
  onChange?: (value: string) => void;
}

export const FormTextInput = <T extends FieldValues>({
  control,
  autofocus,
  name,
  defaultValue,
  placeholder,
  width,
  leftIcon,
  rightIcon,
  style,
  type,
  whiteVariant,
  mask,
  numeric,
  onChange,
  ...props
}: IFormTextInput<T>) => {
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

  const formatNumericValue = (value: string) => {
    if (!numeric) return value;

    const numericValue = value ? value.replace(/\D/g, "") : "";
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  return (
    <Box width={"100%"}>
      {!mask ? (
        <BasicTextFields
          style={style}
          {...field}
          width={width}
          placeholder={placeholder || ""}
          leftIcon={leftIcon}
          autofocus={autofocus}
          rightIcon={rightIcon}
          helperText={helperText}
          whiteVariant={whiteVariant}
          error={!!helperText}
          type={type}
          value={numeric ? formatNumericValue(field.value || "") : field.value}
          onChange={(value: string) => {
            const numericValue = numeric ? value.replace(/\D/g, "") : value;

            onChange?.(numericValue);
            field.onChange(numericValue);
          }}
        />
      ) : (
        <CreditCardInput
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          placeholder={placeholder}
          error={!!helperText}
          helperText={helperText}
          whiteVariant={whiteVariant}
        />
      )}
    </Box>
  );
};
