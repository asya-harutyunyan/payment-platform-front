import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { historyThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import usePlatipayService from "./_services/useHistory";

export const HistoryComponent: FC = () => {
  const {
    dispatch,
    history,
    history_last_page,
    loading,
    page,
    user,
    onChangePage,
    columns,
  } = usePlatipayService();

  useEffect(() => {
    dispatch(historyThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("history")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <>
            <DynamicTable columns={columns} data={history} />
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={history_last_page}
                page={page}
              />
            </Box>
          </>
        </Box>
      )}
    </Box>
  );
};
