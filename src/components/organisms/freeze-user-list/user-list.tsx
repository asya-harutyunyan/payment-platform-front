import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useUserList from "./_services/useUserList";

export const FreezedUserListComponent: FC = () => {
  const {
    page,
    onChangeUsersPage,
    columnsUsers,
    total,
    loading,
    freezedUsers,
  } = useUserList();
  return (
    <Box>
      <TaskHeader title={t("freezed_user_info")} color="#fff" />
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
            <DynamicTable columns={columnsUsers} data={freezedUsers} />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangeUsersPage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
