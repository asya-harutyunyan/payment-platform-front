import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
type Cards = {
  id: number;
  value: string;
};

interface IFormTextInput<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  data: Cards[];
  name: FieldPath<T>;
}

export const FormTextInput = <T extends FieldValues>({
  control,
  data,
  name,
  ...props
}: IFormTextInput<T>) => {
  const { field, fieldState } = useController<T>({
    name,
    control,
    ...props,
  });

  const hasErrors = useMemo(() => {
    return fieldState.isTouched && fieldState.invalid;
  }, [fieldState.invalid, fieldState.isTouched]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
      <FormControl error={hasErrors}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          {...field}
          name={name}
        >
          {data.map((item) => (
            <Box
              key={item.id}
              sx={{
                border: "1px solid white",
                height: "50px",
                width: "100%",
                marginTop: "20px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontSize: "17px",
              }}
            >
              <FormControlLabel
                value={item.value}
                name={name}
                control={
                  <Radio
                    sx={{
                      color: "white !important",
                      marginLeft: "10px",
                      "&.Mui-checked": {
                        color: "white !important",
                      },
                    }}
                  />
                }
                label={item.value}
                sx={{
                  span: {
                    color: "white",
                    fontSize: "17px",
                    letterSpacing: "4px",
                  },
                }}
              />
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
