/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clear as ClearIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
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
  onClear?: () => void;
};

const VERTICAL_PADDING = "40px";

export const MonthPicker = ({
  name,
  control,
  label = "",
  minDate,
  maxDate,
  disabled = false,
  onClear,
}: MonthPickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Box sx={{ position: "relative" }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
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
                      sx: {
                        height: VERTICAL_PADDING,
                        overflow: "hidden",
                        "& .MuiPickersInputBase-root": {
                          height: VERTICAL_PADDING,
                          lineHeight: VERTICAL_PADDING,
                          color: "black",
                        },
                        "& .MuiInputBase-root": {
                          height: VERTICAL_PADDING,
                          color: "black",
                        },
                        "& .MuiInputLabel-root": {
                          color: "primary.main",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                        },
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          color: "primary.main", // Popup text color
                          backgroundColor: "white", // Optional background color
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          color: "primary.main",
                        },
                        "& .MuiIconButton-root": {
                          color: "primary.main",
                        },
                        "& .MuiButtonBase-root": {
                          color: "primary.main",
                        },
                        "& .MuiPickersYear-yearButton": {
                          color: "primary.main",
                        },
                        "& .MuiPickersMonth-monthButton": {
                          color: "primary.main",
                        },
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={() => {
                    field.onChange(null);
                    if (onClear) onClear();
                  }}
                  edge="end"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "50px",
                    transform: "translateY(-50%)",
                    color: "primary.main",
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </>
            )}
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
};
