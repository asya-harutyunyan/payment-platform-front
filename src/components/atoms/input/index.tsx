import { Box } from "@mui/material";
import { ReactNode, useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { BasicTextFields } from "../form-text-input";

interface IFormTextInput<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: T[FieldPath<T>];
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  type?: string;
  // style?: SxProps<Theme>;
  isPassword?: boolean;
}

export const FormTextInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  placeholder,
  leftIcon,
  rightIcon,
  // style,
  type,
  ...props
}: IFormTextInput<T>) => {
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
      <BasicTextFields
        // style={style}
        placeholder={placeholder || ""}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!helperText}
        // error={!!fieldState.error?.message}
        helperText={helperText}
        type={type}
      />
    </Box>
  );
};
