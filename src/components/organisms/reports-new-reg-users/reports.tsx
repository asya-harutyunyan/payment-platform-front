import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import Button from "@/components/atoms/button";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import { EReportFormats } from "@/store/reducers/user-info/reportSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import useReports from "./_services/useReports";

export const ReportsNewUsers = () => {
  const {
    newRegisteredUsers,
    columnsNewRegUsers,
    onChangePageNewUsers,
    pageNewRegUsers,
    totalNewRegUsers,
    newRegUsersloading,
    onDownloadClick,
  } = useReports();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("reports_title_new_reg")}
        color="#fff"
        renderComponent={
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              text="Скачать в CSV"
              variant="contained"
              onClick={() => onDownloadClick(EReportFormats.csv)}
            />
            <Button
              text="Скачать в Excel"
              variant="contained"
              onClick={() => onDownloadClick(EReportFormats.excel)}
            />
          </Box>
        }
      />
      {newRegUsersloading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              overflowY: "auto",
              overflowX: "auto",
              borderRadius: 2,
              minWidth: 0,
              scrollbarGutter: "stable",
            }}
          >
            <DynamicTable
              columns={columnsNewRegUsers}
              data={newRegisteredUsers}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
            <PaginationOutlined
              onPageChange={onChangePageNewUsers}
              count={totalNewRegUsers}
              page={pageNewRegUsers}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
