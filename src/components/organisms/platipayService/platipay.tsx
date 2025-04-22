import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
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
        column: "status_by_client",
        valueKey: "status_by_client",
      },
      {
        column: "transaction_id",
        valueKey: "transaction_id",
      },
    ],
    []
  );

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
