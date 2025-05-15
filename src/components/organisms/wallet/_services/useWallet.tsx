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

import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { CurrencyOptions } from "@/components/utils/status-color";
import { P } from "@/styles/typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import dayjs from "dayjs";
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

  const month = watch("month");

  const [debouncedAddres] = useDebounce(address, 700);
  const [debouncedNetwork] = useDebounce(network, 700);
  const [debouncedCurrency] = useDebounce(currency, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );
  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";
    const status = debouncedCurrency === "all" ? "" : debouncedCurrency;

    if (!isValidMonth) {
      dispatch(
        getWalletsThunk({
          page: page,
          per_page: 20,
          address: debouncedAddres,
          network: debouncedNetwork,
          currency: status,
          month: "",
          sort,
        })
      );
    } else {
      dispatch(
        getWalletsThunk({
          page: page,
          per_page: 20,
          address: debouncedAddres,
          network: debouncedNetwork,
          currency: status,
          month: debouncedMonth,
          sort,
        })
      );
    }
  }, [
    debouncedAddres,
    debouncedCurrency,
    debouncedNetwork,
    debouncedMonth,
    page,
    sort,
  ]);

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
          valueKey: "currency",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("currency")}
                </P>
                <SelectFieldWith
                  placeholder={""}
                  name="currency"
                  control={control}
                  options={CurrencyOptions}
                  height="43px"
                />
              </Box>
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
              column: () => (
                <Box>
                  <P fontWeight={"bold"}>{t("sort_by_created_at")} </P>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <MonthPicker name="month" control={control} />
                    <MonthPicker name="month" control={control} />
                  </Box>
                </Box>
              ),
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
          renderComponent: (row: WalletType) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                    paddingRight: "5px",
                  }}
                >
                  {" "}
                  {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
                </P>
              </Box>
            );
          },
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
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>
          {t("sort_by_created_at")}
        </P>
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
