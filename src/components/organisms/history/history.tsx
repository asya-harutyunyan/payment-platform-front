import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import usePlatipayService from "./_services/useHistory";

export const HistoryComponent: FC = () => {
  const { history, history_last_page, loading, page, onChangePage, columns } =
    usePlatipayService();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("history")} color="#fff" />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              overflowY: "auto",
              overflowX: "auto",
              borderRadius: 2,
              minWidth: 0,
              scrollbarGutter: "stable",
            }}
          >
            <DynamicTable columns={columns} data={history} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: "24px",
            }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={history_last_page}
              page={page}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
