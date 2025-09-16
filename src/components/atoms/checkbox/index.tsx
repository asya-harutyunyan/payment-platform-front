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
  checkedColor?: string;
  uncheckedColor?: string;
  labelColor?: string;
}

export const CustomCheckbox = <T extends FieldValues = FormData>({
  control,
  name,
  label,
  checkedColor = "primary.main",
  uncheckedColor = "grey.500",
  labelColor = "primary.main",
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
            color: uncheckedColor,
            "&.Mui-checked": {
              color: checkedColor,
            },
          }}
        />
      }
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          color: labelColor,
          fontWeight: "300",
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "8px", sm: "14px" },
        },
        padding: "10px 0 10px 10px",
      }}
    />
  );
};
