import { AccordionUsage } from "@/components/atoms/accordeon";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  deleteWalletsThunk,
  getWalletsThunk,
} from "@/store/reducers/admin/walletSlice/thunks";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { CreateWallet } from "../create-wallet";
import { EmptyComponent } from "../empty-component";

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
  const handleDelete = (id?: number) => {
    if (id) {
      dispatch(deleteWalletsThunk(id))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("success_delete_wallet"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getWalletsThunk({ page: page }));
        })
        .catch(() => {
          enqueueSnackbar(t("error"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
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
      {
        column: "key",
        button: "statuses",
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
          <DynamicTable
            columns={columns}
            data={wallet}
            textBtn={"delete_wallet"}
            variant="error"
            handleClickBtn={handleDelete}
          />
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
