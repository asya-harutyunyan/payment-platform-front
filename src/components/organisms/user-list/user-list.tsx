import TaskTable from "@/components/molecules/cards";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getUsersThunk } from "@/store/reducers/user/usersSlice/thunks";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const UserListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [pageData] = useState({
    page: 1,
    per_page: 5,
  });
  useEffect(() => {
    dispatch(
      getUsersThunk({ page: pageData.page, per_page: pageData.per_page })
    );
  }, [pageData]);

  return (
    <Box>
      <TaskHeader title={"User List"} />
      <Box sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}>
        {users && <TaskTable data={users} bg={"light"} />}
      </Box>
    </Box>
  );
};
