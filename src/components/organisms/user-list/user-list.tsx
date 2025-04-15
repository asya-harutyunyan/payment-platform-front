import { User } from "@/common/types";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import DynamicTable from "@/components/molecules/table-new";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUsersThunk } from "@/store/reducers/usersSlice/thunks";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";

export const UserListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const route = useLocation();
  const navigate = useNavigate();
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

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getUsersThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getUsersThunk({ page: page, per_page: 5 }));
    }
  };
  const handleSingleUser = (row?: number) => {
    if (route.pathname === "/user-list") {
      navigate({ to: `/user-list/${row}` });
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
      {
        column: "key",
        renderComponent: (row: User) => {
          return (
            <Button
              variant={"outlined"}
              text={t("see_more")}
              sx={{ width: "130px" }}
              onClick={() => handleSingleUser?.(row.id)}
            />
          );
        },
      },
      {
        column: "key",
        renderComponent: () => {
          return (
            <Button
              variant={"error"}
              text={t("block")}
              sx={{ width: "130px" }}
            />
          );
        },
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
