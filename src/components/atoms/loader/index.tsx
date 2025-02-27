import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

interface ICircularIndeterminate {
  color?: string;
}
export const CircularIndeterminate: FC<ICircularIndeterminate> = ({
  color,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
        color: "white",
      }}
    >
      <CircularProgress sx={{ color: color ?? "#primary.main" }} />
    </Box>
  );
};
