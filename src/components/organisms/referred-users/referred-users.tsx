import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import DynamicTable from "@/components/molecules/table-new";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import { getReferredUsersThunk } from "@/store/reducers/usersSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const ReferredUsers: FC = () => {
  const { referredUsers, total, loading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getReferredUsersThunk({ page: page, per_page: 5 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferredUsersThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<WalletType>[]>(
    () => [
      {
        column: "network",
        valueKey: "network",
      },
      {
        column: "currency",
        valueKey: "currency",
      },
      {
        column: "address",
        valueKey: "address",
      },
      {
        column: "key",
        renderComponent: () => {
          return (
            <Button
              variant={"error"}
              text={"Удалить"}
              sx={{ width: "130px" }}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("referred_users")} />
      {loading ? (
        <CircularIndeterminate />
      ) : referredUsers.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referredUsers} />
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
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
