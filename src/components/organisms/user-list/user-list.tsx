import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getUsersThunk } from "@/store/reducers/usersSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useState } from "react";

export const UserListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { total } = useAppSelector((state) => state.users);

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getUsersThunk({ page: page }));
  }, []);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getUsersThunk({ page }));
    console.log(event)
  };

  const title = ["name", "surname", "email", "role"];
  return (
    <Box>
      <TaskHeader title={t("user_list_title")} />
      <Box sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}>
        <DynamicTable
          isUser
          columns={title}
          data={users as unknown as Record<string, ReactNode>[]}
          onChangePage={onChangePage}
        />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {" "}
          <PaginationOutlined onPageChange={onChangePage} count={total} />
        </Box>
      </Box>
    </Box>
  );
};
