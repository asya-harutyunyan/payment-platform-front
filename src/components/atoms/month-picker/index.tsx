/* eslint-disable @typescript-eslint/no-explicit-any */
// MonthPicker.tsx
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { Control, Controller } from "react-hook-form";

type MonthPickerProps = {
  name: string;
  control: Control<any>;
  label?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
};

export const MonthPicker = ({
  name,
  control,
  label = "Select month",
  minDate,
  maxDate,
  disabled = false,
}: MonthPickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              views={["year", "month"]}
              label={label}
              value={field.value}
              onChange={field.onChange}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
