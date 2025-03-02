import { Box } from "@mui/material";
import { CSSProperties, ReactNode, useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IFormPhoneInput<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: T[FieldPath<T>];
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  style?: CSSProperties;
  whiteVariant?: boolean;
}

export const FormPhoneInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  placeholder,
  style,
  whiteVariant,
  ...props
}: IFormPhoneInput<T> & { backgroundColor?: string }) => {
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

  const borderColor = fieldState.invalid
    ? "red"
    : whiteVariant
      ? "#D9D9D9"
      : "#0E1D40";
  const inputTextColor = fieldState.invalid
    ? "red"
    : whiteVariant
      ? "#D9D9D9"
      : "#0E1D40";

  return (
    <Box sx={{ margin: "10px 0" }}>
      <PhoneInput
        placeholder={placeholder || "Enter phone number"}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        country={"ru"}
        inputStyle={{
          ...style,
          width: "100%",
          minHeight: "55px",
          color: inputTextColor,
          borderColor: borderColor,
          fontFamily: "Poppins, sans-serif",
          backgroundColor: !whiteVariant ? "#fff" : "#0E1D40",
        }}
        buttonStyle={{
          borderColor: borderColor,
          backgroundColor: !whiteVariant ? "#fff" : "#0E1D40",
        }}
      />
      {helperText && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {helperText}
        </div>
      )}
    </Box>
  );
};
