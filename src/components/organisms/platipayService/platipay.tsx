import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { Platipay } from "@/store/reducers/user-info/depositSlice/types";
import { platipayThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const PlatiPay: FC = () => {
  const { platipay, total, loading } = useAppSelector((state) => state.reports);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(platipayThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(platipayThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<Platipay>[]>(
    () => [
      {
        column: "amount",
        currencyManual: " ₽",
        valueKey: "amount",
      },
      {
        column: "amount_order",
        renderComponent: (row: Platipay) => {
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
        column: "transaction_id",
        valueKey: "transaction_id",
      },
      {
        column: "created_at",
        valueKey: "created_at",
      },
    ],
    []
  );
  // {row.status_by_client && t(row.status_by_client)}
  // </span>}}
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("platipay")} />
      {loading ? (
        <CircularIndeterminate />
      ) : platipay.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={platipay} />
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
