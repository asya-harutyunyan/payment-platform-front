import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUsersThunk } from "@/store/reducers/allUsersSlice/thunks";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import {
  DataDeposits,
  Order,
} from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

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

  const onChangeUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    dispatch(
      getUsersThunk({
        page,
        per_page: 20,
      })
    );
  };

  const columnsDeposits = useMemo<IColumn<DataDeposits>[]>(
    () =>
      [
        {
          column: "amount",
          valueKey: "amount",
        },
        {
          column: "net_amount",
          valueKey: "net_amount",
        },

        {
          column: "status",
          valueKey: "status",
        },
        {
          column: "created_at",
          renderComponent: (row: DataDeposits) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                    paddingRight: "5px",
                  }}
                >
                  {" "}
                  {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
                </P>
              </Box>
            );
          },
        },
      ].filter(Boolean) as IColumn<DataDeposits>[],
    [user?.permissions]
  );
  const columnsOrders = useMemo<IColumn<Order>[]>(
    () =>
      [
        {
          column: "amount",
          valueKey: "amount",
        },
        {
          column: "transaction_id",
          valueKey: "transaction_id",
        },

        {
          column: "status_by_client",
          valueKey: "status_by_client",
        },
        {
          column: "created_at",
          renderComponent: (row: Order) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                    paddingRight: "5px",
                  }}
                >
                  {" "}
                  {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
                </P>
              </Box>
            );
          },
        },
      ].filter(Boolean) as IColumn<Order>[],
    [user?.permissions]
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
    onChangeUsersPage,
    columnsDeposits,
    columnsOrders,
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
