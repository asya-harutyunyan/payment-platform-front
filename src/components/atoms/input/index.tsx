import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FC } from "react";

interface IBasicTextFields {
  sx?: SxProps<Theme>;
  placeholder: string;
}
export const BasicTextFields: FC<IBasicTextFields> = ({ sx, placeholder }) => {
  return (
    <Box
      component="form"
      sx={{ ...sx, "& > :not(style)": { mb: 1, mt: 1 } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={placeholder}
        variant="outlined"
        sx={{
          width: "100%",
          border: "#B5BBC6",
          ".MuiFormLabel-root": {
            color: "#B5BBC6",
          },
        }}
      />
    </Box>
  );
};
