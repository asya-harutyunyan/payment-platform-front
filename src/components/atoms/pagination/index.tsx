import theme from "@/styles/theme";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface IPaginationOutlined {
  onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  count?: number;
}

export const PaginationOutlined: FC<IPaginationOutlined> = ({
  onPageChange,
  count,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={onPageChange}
        variant="outlined"
        count={count}
        color="secondary"
        sx={{
          "& .MuiPaginationItem-root:not(.Mui-selected)": {
            color: theme.palette.tertiary.contrastText,
            borderColor: "gray",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          },
          "& .MuiPaginationItem-previousNext": {
            color: theme.palette.primary.main,
          },
        }}
      />
    </Stack>
  );
};
