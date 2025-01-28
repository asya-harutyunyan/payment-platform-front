import theme from "@/styles/theme";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface IPaginationOutlined {
  onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationOutlined: FC<IPaginationOutlined> = ({
  onPageChange,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={onPageChange}
        variant="outlined"
        color="secondary"
        sx={{
          "& .MuiPaginationItem-root:not(.Mui-selected)": {
            color: theme.palette.tertiary.contrastText, // Color for unselected items
            borderColor: "gray", // Border color for unselected items
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main, // Selected page item background
            color: theme.palette.common.white, // Color for selected item text
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark, // Darker background when hovered
            },
          },
          "& .MuiPaginationItem-previousNext": {
            color: theme.palette.primary.main, // Color for "Previous" and "Next" buttons
          },
        }}
      />
    </Stack>
  );
};
