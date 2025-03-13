import { User } from "@/common/types";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUsersThunk } from "@/store/reducers/usersSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";

export const UserListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { users, total, loading } = useAppSelector((state) => state.users);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getUsersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getUsersThunk({ page: page, per_page: 5 }));
    }
  }, [dispatch, page, user?.role]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getUsersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getUsersThunk({ page: page, per_page: 5 }));
    }
  };

  const columns = useMemo<IColumn<User>[]>(
    () => [
      {
        column: "name",
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );

  return (
    <Box>
      <TaskHeader title={t("user_list_title")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <DynamicTable
            columns={columns}
            data={users}
            onChangePage={onChangePage}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
