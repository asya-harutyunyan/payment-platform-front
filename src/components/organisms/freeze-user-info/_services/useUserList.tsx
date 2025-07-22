import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { pangingOrder } from "@/store/reducers/allUsersSlice/types";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

const useUserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useLocation();
  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);

  const { users, pandingOrders, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(
      getDepositsThunk({
        page: page,
        per_page: 5,
      })
    );
  };

  const orderColumns = useMemo<IColumn<pangingOrder>[]>(
    () =>
      [
        {
          column: "status",
          valueKey: "status",
        },
        {
          column: "created_at",
          valueKey: "created_at",
        },
      ].filter(Boolean) as IColumn<pangingOrder>[],
    [user?.permissions]
  );

  return {
    dispatch,
    navigate,
    route,
    pandingOrders,
    orderColumns,
    user,
    page,
    setPage,
    users,
    blockedUsers,
    total,
    loading,
    selectedTab,
    setSelectedTab,
    onChangePage,
  };
};

export default useUserList;
