import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface FormData {
  checkbox: boolean;
}

interface CustomCheckboxProps extends CheckboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: keyof FormData;
  label?: string;
}

export const CustomCheckbox = ({
  control,
  name,
  label,
  ...props
}: CustomCheckboxProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
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
    )}
  />
);
