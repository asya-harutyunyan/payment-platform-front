import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";

import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import {
  deleteWalletsThunk,
  getWalletsThunk,
} from "@/store/reducers/user-info/walletSlice/thunks";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useMemo, useState } from "react";

const useWallet = () => {
  const { wallet, total, loading } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string | number | null>(
    null
  );

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getWalletsThunk({ page: page, per_page: 20 }));
  };
  const handleDeleteModal = (id?: number) => {
    setOpen(true);
    setSelectedItem(id as number);
  };
  const handleDeleteItem = () => {
    dispatch(deleteWalletsThunk(selectedItem as number))
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("success_delete_wallet"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        dispatch(getWalletsThunk({ page: page, per_page: 20 }));
        setOpen(false);
      })
      .catch(() => {
        enqueueSnackbar(t("error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
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
        renderComponent: (row: WalletType) => {
          return (
            <Button
              variant={"error"}
              text={"Удалить"}
              sx={{ width: "130px" }}
              onClick={() => handleDeleteModal?.(row.id)}
            />
          );
        },
      },
    ],
    []
  );

  return {
    columns,
    handleDeleteItem,
    handleDeleteModal,
    onChangePage,
    selectedItem,
    setSelectedItem,
    user,
    open,
    setOpen,
    page,
    setPage,
    dispatch,
    wallet,
    total,
    loading,
  };
};

export default useWallet;
