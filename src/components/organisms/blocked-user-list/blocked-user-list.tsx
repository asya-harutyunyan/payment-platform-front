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
      <TaskHeader title={t("blocked_user_list_title")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
         
          }}
        >
          <DynamicTable columns={columnsBlockedUsers} data={blockedUsers} />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
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
