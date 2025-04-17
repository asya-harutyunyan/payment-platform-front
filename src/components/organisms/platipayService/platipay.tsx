import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getWalletsThunk } from "@/store/reducers/admin/walletSlice/thunks";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const PlatiPay: FC = () => {
  const { wallet, total, loading } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getWalletsThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getWalletsThunk({ page: page, per_page: 5 }));
    }
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getWalletsThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getWalletsThunk({ page: page, per_page: 5 }));
    }
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
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("platipay")} />
      {loading ? (
        <CircularIndeterminate />
      ) : wallet.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={wallet} />
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
