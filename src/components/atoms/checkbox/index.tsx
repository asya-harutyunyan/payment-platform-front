import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface FormData {
  checkbox: boolean;
}

interface CustomCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, "defaultValue" | "name">,
    UseControllerProps<T> {
  label?: string;
}

export const CustomCheckbox = <T extends FieldValues = FormData>({
  control,
  name,
  label,
  ...props
}: CustomCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />
      }
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          color: "primary.main",
          fontWeight: "300",
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
        },
        padding: "10px 0 10px 10px",
      }}
    />
  );
};
