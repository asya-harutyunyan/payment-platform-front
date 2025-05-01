import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
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
  } = useReports();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("reports_title_new_reg")} />
      {newRegUsersloading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable
            columns={columnsNewRegUsers}
            data={newRegisteredUsers}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
