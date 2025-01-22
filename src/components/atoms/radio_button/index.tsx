import theme from "@/styles/theme";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FC } from "react";

interface IRadioButtonsGroup {
  gender?: string;
  label?: string;
}
export const RadioButtonsGroup: FC<IRadioButtonsGroup> = ({
  gender,
  label,
}) => {
  return (
    <FormControl>
      {gender && (
        <FormLabel id="demo-radio-buttons-group-label">{gender}</FormLabel>
      )}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ color: theme.palette.tertiary.main, paddingLeft: "10px" }}
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label={label ?? ""}
          sx={{
            color: "white",
            "& .MuiRadio-root": {
              color: "white",
            },
            "& .Mui-checked": {
              color: "white",
            },
          }}
        />
      </RadioGroup>
    </FormControl>
  );
};
