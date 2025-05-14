import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk } from "@/store/reducers/allUsersSlice/thunks";
import { H4, P } from "@/styles/typography";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Divider } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../../molecules/paper/paper";
import { EmptyComponent } from "../empty-component";
import useUserList from "./_services/useUserList";
import { fields } from "./columns";

export const UserInfo: FC = () => {
  const { user, loading } = useAppSelector((state) => state.users);
  const { id } = useParams({ from: "/_auth/_admin/user-list/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { columnsDeposits, columnsOrders } = useUserList();
  useEffect(() => {
    dispatch(getUserThunk(Number(id)));
  }, [dispatch, id]);
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
        {" "}
        {canGoBack && (
          <Button
            onClick={() => router.history.back()}
            variant={"outlined"}
            text={t("back")}
            sx={{ height: "30px", fontSize: "15px", color: "primary.main" }}
            icon={ArrowLeftIcon}
          />
        )}
        <TaskHeader
          title={t("user_info")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
      {!user ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={user}
            loading={loading}
            fields={fields}
            title={"Список пользователь"}
          />
          <Box sx={{ marginTop: "20px" }}>
            <H4 color="primary.main">{t("deposits")}</H4>
            <Divider />
            <Box
              sx={{
                margin: "30px 0",
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }}
            >
              <P sx={{ fontWeight: "bold" }}>
                {t("amount_payed")}: {user.deposits.amount_payed}
              </P>
              <P sx={{ fontWeight: "bold" }}>
                {t("profit_deposit")}: {user.deposits.profit}
              </P>
              <P sx={{ fontWeight: "bold" }}>
                {t("total_amount")}: {user.deposits.total_amount}
              </P>
            </Box>
            {user.deposits.data && user.deposits.data.length ? (
              <DynamicTable
                columns={columnsDeposits}
                data={user.deposits.data}
              />
            ) : (
              <Box>
                <EmptyComponent text={"no_deposits"} />
              </Box>
            )}
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <H4 color="primary.main">{t("orders")}</H4>
            <Divider />
            {user.current_orders.data && user.current_orders.data.length ? (
              <DynamicTable
                columns={columnsOrders}
                data={user.current_orders.data}
              />
            ) : (
              <Box>
                <EmptyComponent text={"no_orders"} />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", width: "90%" }}>
            {/* <PaginationOutlined
              page={page}
              onPageChange={onChangePage}
              count={pagination.last_page}
            /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};
