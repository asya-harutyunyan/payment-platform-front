import { CopyButton } from "@/components/atoms/copy-btn";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { Order } from "@/store/reducers/user-info/depositSlice/types";
import { getDeletedOrdersThunk } from "@/store/reducers/user-info/orderSlice/thunks";
import { P } from "@/styles/typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";

const useDeletedOrders = () => {
  const { deletedOrders, total, loading } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const { user } = useAuth();
  const { goToUserPage } = useUserContext();

  useEffect(() => {
    dispatch(
      getDeletedOrdersThunk({
        page,
        per_page: 20,
        sort,
      })
    );
  }, [sort, page]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };

  const columns = useMemo<IColumn<Order>[]>(
    () =>
      [
        {
          renderComponent: (row: Order) => {
            return (
              <span
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
              </span>
            );
          },
          column: () => (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {t("sort_by_created_at")}
              </P>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {sortComponent()}
              </Box>
            </Box>
          ),
        },
        {
          column: "name",
          renderComponent: (row: Order) => {
            return (
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => goToUserPage(row.id)}
              >
                {row?.user?.name}
              </P>
            );
          },
        },
        {
          column: "surname",
          valueKey: "user.surname",
        },
        {
          column: "status_by_client",
          renderComponent: (row: Order) => {
            return (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: getStatusColor(row.status_by_client ?? "-"),
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
              >
                {row.status_by_client && t(row.status_by_client)}
              </span>
            );
          },
        },

        {
          column: "amount_order",
          currency: "wallet_deposit.order_currency",
          valueKey: "amount",
        },

        {
          column: "id",
          valueKey: "transaction_id",
          renderComponent: (row: Order) => {
            return (
              row.transaction_id && (
                <CopyButton text={row.transaction_id} color={"#7d7d7d"} />
              )
            );
          },
        },
        {
          column: "card_number",
          valueKey: "wallet_deposit.payment_method.card_number",
        },
      ].filter(Boolean) as IColumn<Order>[],
    [user?.permissions]
  );
  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40px",
            cursor: "pointer",
          }}
        >
          <ExpandLessIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("DESC")}
          />
        </Box>
      </Box>
    );
  };

  return {
    dispatch,
    deletedOrders,
    total,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
  };
};
export default useDeletedOrders;
