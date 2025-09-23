import theme from "@/styles/theme";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";

interface IPaginationOutlined {
  onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  count?: number;
  page?: number;
}

export const PaginationOutlined: FC<IPaginationOutlined> = ({
  onPageChange,
  count,
  page = 1,
}) => {
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, pageNumber: number) => {
      if (onPageChange) {
        onPageChange(event, pageNumber);
      }

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    },
    [onPageChange]
  );

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handlePageChange}
        variant="outlined"
        count={count}
        page={page}
        color="secondary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            borderColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          },
          "& .MuiPaginationItem-root.MuiPaginationItem-previousNext": {
            color: "white",
            borderColor: "white",
          },
        }}
      />
    </Stack>
  );
};
