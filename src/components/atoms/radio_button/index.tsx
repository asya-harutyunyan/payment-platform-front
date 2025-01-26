import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FC, useState } from "react";

type Cards = {
  id: number;
  value: string;
};

interface IRadioButtonsGroup {
  data: Cards[];
}

export const RadioButtonsGroup: FC<IRadioButtonsGroup> = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    data[0]?.value || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value); // Ensure only one selection
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedValue}
          onChange={handleChange}
          name="radio-buttons-group"
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
