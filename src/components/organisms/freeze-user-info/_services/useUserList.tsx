import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const useUserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useLocation();
  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);

  const { users, blockedUsers, total, loading } = useAppSelector(
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
  return {
    dispatch,
    navigate,
    route,
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
