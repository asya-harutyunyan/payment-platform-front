import { AccordionUsage } from "@/components/atoms/accordeon";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { getWalletsThunk } from "@/store/reducers/admin/walletSlice/thunks";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { CreateWallet } from "../create-wallet";
import { EmptyComponent } from "../empty-component";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";

export const Wallet: FC = () => {
  const { wallet, total, loading } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getWalletsThunk({ page: page }));
  }, [dispatch, page]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getWalletsThunk({ page }));
    console.log(event);
  };

  const columns = useMemo<IColumn<WalletType>[]>(
    () => [
      {
        column: "network",
        valueKey: "address",
      },
      {
        column: "currency",
        valueKey: "currency",
      },
      {
        column: "address",
        valueKey: "network",
      },
    ],
    []
  );
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("wallet_list")} />
      <AccordionUsage title={"add_wallet"}>
        <CreateWallet page={page} />
      </AccordionUsage>
      {loading ? (
        <CircularIndeterminate />
      ) : wallet.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            overflowX: "auto",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={wallet} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {" "}
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </Box>
  );
};
