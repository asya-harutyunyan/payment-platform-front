import TaskTable from "@/components/molecules/cards";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getUsersThunk } from "@/store/reducers/user/usersSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";

export const UserListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getUsersThunk({ page: page }));
  }, []);

  return (
    <Box>
      <TaskHeader title={t("user_list_title")} />
      <Box sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}>
        {users && <TaskTable data={users} bg={"light"} setPage={setPage} />}
      </Box>
    </Box>
  );
};
