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
  width?: string;
  maxDate?: Dayjs;
  disabled?: boolean;
  onClear?: () => void;
  onOpen?: () => void; // добавляем коллбэки
  onClose?: () => void;
};

const VERTICAL_PADDING = "43px";

export const MonthPicker = ({
  name,
  control,
  label = "",
  minDate,
  maxDate,
  width,
  onClose,
  onOpen,
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
                  views={["day", "year", "month"]}
                  label={label}
                  value={field.value}
                  onChange={field.onChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={disabled}
                  sx={{ width: width ?? "100px" }}
                  onOpen={onOpen}
                  onClose={onClose}
                  slotProps={{
                    textField: {
                      fullWidth: false,

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
                          lineHeight: VERTICAL_PADDING,
                          top: "50%",
                          transform: "translateY(-50%)",
                          paddingLeft: "10px",
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
                          background:
                            "linear-gradient(180deg, #6BADFC 0%, #041F44 100%)",
                          color: "white",
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          color: "white",
                        },
                        "& .MuiIconButton-root": {
                          color: "white",
                        },
                        "& .MuiButtonBase-root": {
                          color: "white",
                        },
                        "& .MuiPickersYear-yearButton": {
                          color: "white",
                        },
                        "& .MuiPickersMonth-monthButton": {
                          color: "white",
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
