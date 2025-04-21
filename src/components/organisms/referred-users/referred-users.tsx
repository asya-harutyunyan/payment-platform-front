import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getReferredUsersForAdminThunk } from "@/store/reducers/allUsersSlice/thunks";
import { RefferedUsersList } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const ReferredUsers: FC = () => {
  const { referralUsersForAdmin, total, loading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 5 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<RefferedUsersList>[]>(
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
        column: "total_amount",
        valueKey: "total_amount",
      },
      {
        column: "referral_percentage",
        valueKey: "referral_percentage",
      },
      {
        column: "ref_count",
        valueKey: "ref_count",
      },
      {
        column: "referral_code",
        valueKey: "referral_code",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("referred_users")} />
      {loading ? (
        <CircularIndeterminate />
      ) : referralUsersForAdmin.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referralUsersForAdmin} />
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
