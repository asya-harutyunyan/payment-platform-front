import { User } from "@/common/types";
import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getBlockedUsersThunk,
  getUsersThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import {
  blockUserThunk,
  unblockUserThunk,
} from "@/store/reducers/authSlice/thunks";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";

const useUserList = () => {
  const dispatch = useAppDispatch();
  const route = useLocation();
  const navigate = useNavigate();
  const { users, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageBlockedUsers, setPageBlockedUsers] = useState(1);

  useEffect(() => {
    dispatch(getUsersThunk({ page: page, per_page: 20 }));
    dispatch(getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangeUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage?.(page);
    dispatch(getUsersThunk({ page: page, per_page: 20 }));
  };

  const onChangeBlockedUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageBlockedUsers?.(page);
    dispatch(getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 }));
  };
  const handleSingleUser = (row?: number) => {
    if (route.pathname === "/user-list") {
      navigate({ to: `/user-list/${row}` });
    }
  };

  const columnsUsers = useMemo<IColumn<User>[]>(
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
        renderComponent: (row: User) => {
          return (
            <Button
              variant={"error"}
              text={t("block")}
              sx={{ width: "130px" }}
              onClick={() => blockUser(row.id)}
            />
          );
        },
      },
    ],
    []
  );
  const columnsBlockedUsers = useMemo<IColumn<User>[]>(
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
        renderComponent: (row: User) => {
          return (
            <Button
              variant={"contained"}
              text={t("unblock")}
              sx={{ width: "130px" }}
              onClick={() => unblockUser(row.id)}
            />
          );
        },
      },
    ],
    []
  );
  const blockUser = (id: number) => {
    dispatch(blockUserThunk(id))
      .unwrap()
      .then(() => {
        dispatch(getUsersThunk({ page: page, per_page: 20 }));
        dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      });
  };
  const unblockUser = (id: number) => {
    dispatch(unblockUserThunk(id))
      .unwrap()
      .then(() => {
        dispatch(getUsersThunk({ page: page, per_page: 20 }));
        dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      });
  };

  return {
    dispatch,
    navigate,
    route,
    user,
    page,
    setPage,
    onChangeUsersPage,
    onChangeBlockedUsersPage,
    handleSingleUser,
    columnsUsers,
    columnsBlockedUsers,
    blockUser,
    users,
    blockedUsers,
    total,
    loading,
  };
};

export default useUserList;
