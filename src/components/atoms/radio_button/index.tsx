import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect, useMemo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
interface IFormTextInput<T extends FieldValues, U extends object>
  extends UseControllerProps<T> {
  control: Control<T>;
  data: U[];
  name: FieldPath<T>;
  labelKey?: keyof U;
  valueKey?: keyof U;
  onItemDelete?: (item: U) => void;
}
export const RadioButtonsGroup = <T extends FieldValues, U extends object>({
  control,
  data,
  onItemDelete,
  name,
  labelKey,
  valueKey,
  ...props
}: IFormTextInput<T, U>) => {
  const { field, fieldState } = useController<T>({
    name,
    control,
    ...props,
  });

  const hasErrors = useMemo(() => {
    return fieldState.isTouched && fieldState.invalid;
  }, [fieldState.invalid, fieldState.isTouched]);
  useEffect(() => {});
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
      <FormControl error={hasErrors}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          {...field} // Bind RadioGroup to React Hook Form field state
          name={name}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid white",
                height: "50px",
                marginTop: "20px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "17px",
              }}
            >
              <FormControlLabel
                value={valueKey ? item[valueKey as keyof U] : item}
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
                label={
                  labelKey
                    ? `${item[labelKey as keyof U]}`
                    : (item as unknown as string)
                }
                sx={{
                  span: {
                    color: "white",
                    fontSize: "17px",
                    letterSpacing: "4px",
                  },
                }}
              />
              {onItemDelete && (
                <DeleteIcon
                  sx={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => onItemDelete?.(item)}
                />
              )}
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
