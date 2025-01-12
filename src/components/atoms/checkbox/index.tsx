import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

export const CustomCheckbox = ({
  label,
  ...props
}: CheckboxProps & { label: string }) => (
  <FormControlLabel
    control={
      <Checkbox
        {...props}
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
