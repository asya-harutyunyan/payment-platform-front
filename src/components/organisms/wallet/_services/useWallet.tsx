import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch, useAppSelector } from "@/store";

import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import {
  deleteWalletsThunk,
  getWalletsThunk,
} from "@/store/reducers/user-info/walletSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

import { P } from "@/styles/typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
type FormData = z.infer<typeof add_wallet_schema>;

const useWallet = () => {
  const { wallet, total, loading } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string | number | null>(
    null
  );
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(add_wallet_schema),
    defaultValues: {
      address: "",
      network: "",
      currency: "",
    },
  });

  const address = watch("address");
  const network = watch("network");
  const currency = watch("currency");

  const [debouncedAddres] = useDebounce(address, 700);
  const [debouncedNetwork] = useDebounce(network, 700);
  const [debouncedCurrency] = useDebounce(currency, 700);

  useEffect(() => {
    dispatch(
      getWalletsThunk({
        page: page,
        per_page: 20,
        address: debouncedAddres,
        network: debouncedNetwork,
        currency: debouncedCurrency,
        sort,
      })
    );
  }, [debouncedAddres, debouncedCurrency, debouncedNetwork, page]);

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
    () =>
      [
        {
          column: "network",
          valueKey: "network",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("network")}
                name="network"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "currency",
          valueKey: "currency",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("currency")}
                name="currency"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "address",
          valueKey: "address",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("address")}
                name="address"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        user?.permissions.includes("wallet_delete")
          ? {
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
            }
          : null,
        {
          column: () => sortComponent(),
        },
      ].filter(Boolean) as IColumn<WalletType>[],
    [user?.permissions]
  );

  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>Сортировка </P>
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
