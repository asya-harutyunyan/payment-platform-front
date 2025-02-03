import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const CircularIndeterminate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
