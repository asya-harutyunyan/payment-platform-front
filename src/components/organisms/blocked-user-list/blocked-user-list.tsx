import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useBlockedUserList from "./_services/useBlockedUserList";

export const BlockedUserListComponent: FC = () => {
  const {
    total,
    loading,
    columnsBlockedUsers,
    blockedUsers,
    onChangeBlockedUsersPage,
    pageBlockedUsers,
  } = useBlockedUserList();

  return (
    <Box>
      <TaskHeader title={t("blocked_user_list_title")} color="#fff" />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              minWidth: "max-content",
              overflow: "auto",
              borderRadius: 2,
            }}
          >
            <DynamicTable columns={columnsBlockedUsers} data={blockedUsers} />
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
              onPageChange={onChangeBlockedUsersPage}
              count={total}
              page={pageBlockedUsers}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
