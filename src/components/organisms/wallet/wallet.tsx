import bg from "@/assets/images/modal.png";
import { AccordionUsage } from "@/components/atoms/accordeon";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  deleteWalletsThunk,
  getWalletsThunk,
} from "@/store/reducers/admin/walletSlice/thunks";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import { H3 } from "@/styles/typography";
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
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string | number | null>(
    null
  );

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
        if (user?.role === "admin") {
          dispatch(getWalletsThunk({ page: page, per_page: 20 }));
        } else {
          dispatch(getWalletsThunk({ page: page, per_page: 5 }));
        }
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

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("wallet_list")} />
      <AccordionUsage title={"add_wallet"}>
        {(onClose) => <CreateWallet page={page} onClose={onClose} />}
      </AccordionUsage>
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
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
      >
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("delete_wallet_modal")}
        </H3>
        <Box
          sx={{
            display: "flex",
            width: {
              lg: "30%",
              md: "30%",
              xs: "100%",
              sm: "100%",
            },
            justifyContent: "space-between",
            flexDirection: {
              lg: "row",
              md: "row",
              xs: "column",
              sm: "column",
            },
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setOpen(false)}
            sx={{
              marginBottom: {
                lg: "0",
                md: "0",
                xs: "10px",
                sm: "10px",
              },
            }}
          />
          <Button
            variant={"text"}
            text={t("yes")}
            onClick={() => handleDeleteItem()}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};
