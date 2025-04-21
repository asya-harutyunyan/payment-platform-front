import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCodeReferralThunk,
  getReferalsUserThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { ReferralOfUser } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const PartnerProgramComponent: FC = () => {
  const { referralUser, total, loading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
  };

  const columns = useMemo<IColumn<ReferralOfUser>[]>(
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
        column: "amount",
        valueKey: "amount",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );
  const generateReferalCode = () => {
    dispatch(generateCodeReferralThunk())
      .unwrap()
      .then(() => {
        dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
      });
  };
  useEffect(() => {
    dispatch(getReferalsUserThunk({ page: page, per_page: 5 }));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("partner_program")}
        subTitle="Заработок 10% от дохода приведённых Вами пользователей"
        renderComponent={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {!user?.referral?.referral_code && (
              <Button
                variant={"gradient"}
                text={t("generate")}
                sx={{ width: "130px" }}
                onClick={generateReferalCode}
              />
            )}
            {user?.referral?.referral_code && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  padding: "10px 0",
                }}
              >
                <CopyButton text={user?.referral?.referral_code} />
                <P color="primary.main">{user?.referral?.referral_code}</P>
              </Box>
            )}
          </Box>
        }
      />

      {loading ? (
        <CircularIndeterminate />
      ) : referralUser.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referralUser} />
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
