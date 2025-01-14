import theme from "@/styles/theme";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationOutlined() {
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{
          "& .MuiPaginationItem-root:not(.Mui-selected)": {
            color: theme.palette.tertiary.contrastText,
            borderColor: "gray",
          },
        }}
        count={10}
        variant="outlined"
        color={"secondary"}
      />
    </Stack>
  );
}
