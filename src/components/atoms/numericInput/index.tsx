import { Box, SxProps } from "@mui/material";
import { ReactNode, useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { BasicTextFields } from "../form-text-input";

interface IFormNumberInput<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: T[FieldPath<T>];
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  style?: SxProps;
  whiteVariant?: boolean;
  autofocus?: boolean;
}

export const FormNumericInput = <T extends FieldValues>({
  control,
  autofocus,
  name,
  defaultValue,
  placeholder,
  leftIcon,
  rightIcon,
  style,
  whiteVariant,
  ...props
}: IFormNumberInput<T>) => {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
    ...props,
  });

  const helperText = useMemo(() => {
    if (
      fieldState.isTouched &&
      fieldState.invalid &&
      fieldState.error?.message
    ) {
      return fieldState.error.message;
    }
    return undefined;
  }, [fieldState]);

  return (
    <Box width={"100%"}>
      <NumericFormat
        customInput={BasicTextFields}
        value={field.value ?? ""}
        onValueChange={(values) => field.onChange(values.value || "")}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={0}
        allowNegative={false}
        suffix=" ₽"
        inputMode="numeric"
        placeholder={placeholder || ""}
        autoFocus={autofocus}
        error={!!helperText}
        helperText={helperText}
        whiteVariant={whiteVariant}
        style={style}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    </Box>
  );
};
