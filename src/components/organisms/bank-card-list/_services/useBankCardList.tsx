import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { bank_card_schema } from "@/schema/bank_card_schena";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  blockCardThunk,
  getBankCardsThunk,
  unblockCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { CurrencyOptions } from "@/components/utils/status-color";
import { edit_card_schema } from "@/schema/add_card.schema";
import {
  changeAndReassignCardThunk,
  getBankNamesThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

type FormData = z.infer<typeof bank_card_schema>;

type TEditCardData = z.infer<typeof edit_card_schema>;

const useBankCardList = () => {
  const { goToUserPage } = useUserContext();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const banks = useAppSelector((state) => state.users.banks);

  const { bankCards, loading, total } = useAppSelector(
    (state) => state.bankDetails
  );

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(bank_card_schema),
    defaultValues: {
      card_holder: "",
      card_number: "",
      bank_name: "",
      currency: "",
      name: "",
      from: undefined,
      to: undefined,
    },
  });

  const form = useForm<TEditCardData>({
    resolver: zodResolver(edit_card_schema),
  });

  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");

  const CardHolder = watch("card_holder");
  const BankName = watch("bank_name");
  const Currency = watch("currency") === "all" ? "" : watch("currency");
  const CardNumber = watch("card_number");
  const from = watch("from");
  const to = watch("to");
  const name = watch("name");

  const [debounceCardHolder] = useDebounce(CardHolder, 700);
  const [debouncedBankName] = useDebounce(BankName, 700);
  const [debouncedCardNumber] = useDebounce(CardNumber, 700);
  const [debouncedCurrency] = useDebounce(Currency, 700);
  const [debouncedName] = useDebounce(name, 700);

  const [debouncedFrom] = useDebounce(
    from && dayjs(from).isValid() ? dayjs(from).format("DD.MM.YYYY") : "",
    2000
  );
  const [debouncedTo] = useDebounce(
    to && dayjs(to).isValid() ? dayjs(to).format("DD.MM.YYYY") : "",
    2000
  );

  useEffect(() => {
    dispatch(getBankNamesThunk());
    if (isDatePickerOpen) return;
    const isValidRange =
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();
    const status = debouncedCurrency === "all" ? "" : debouncedCurrency;

    dispatch(
      getBankCardsThunk({
        page: page,
        per_page: 20,
        card_holder: debounceCardHolder,
        card_number: debouncedCardNumber,
        bank_name: debouncedBankName,
        currency: status,
        name: debouncedName,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        sort,
      })
    );
  }, [
    debouncedBankName,
    debounceCardHolder,
    debouncedFrom,
    debouncedTo,
    debouncedCardNumber,
    debouncedCurrency,
    debouncedName,
    page,
    sort,
    dispatch,
  ]);

  const columns = useMemo<IColumn<BankCardsDetalis>[]>(
    () =>
      [
        {
          column: () => (
            <Box>
              <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <MonthPicker
                      width="130px"
                      name="from"
                      control={control}
                      onOpen={() => setIsDatePickerOpen(true)}
                      onClose={() => setIsDatePickerOpen(false)}
                    />
                    <MonthPicker
                      width="130px"
                      name="to"
                      control={control}
                      onOpen={() => setIsDatePickerOpen(true)}
                      onClose={() => setIsDatePickerOpen(false)}
                    />
                  </Box>
                </Box>
                {sortComponent()}
              </Box>
            </Box>
          ),
          renderComponent: (row: BankCardsDetalis) => {
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
                  {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
                </P>
              </Box>
            );
          },
        },
        {
          renderComponent: (row: BankCardsDetalis) => {
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
                onClick={() => row.id && goToUserPage(row.user_id)}
              >
                {row.card_holder}
              </P>
            );
          },
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("card_holder")}
                </P>
                <FormTextInput
                  control={control}
                  name="card_holder"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },
        {
          valueKey: "user.name",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("name_user")}
                </P>
                <FormTextInput
                  control={control}
                  name="name"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },
        {
          valueKey: "bank_name",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("bank_name")}
                </P>
                <FormTextInput
                  control={control}
                  name="bank_name"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },
        {
          renderComponent: (row: BankCardsDetalis) => {
            return (
              <Box sx={{ display: "flex" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {row.card_number}
                </P>
                <IconButton
                  onClick={() => {
                    const bank = banks.find(
                      (bank) =>
                        bank.name === row.bank_name ||
                        bank.key === row.bank_name
                    );

                    form.reset({
                      bank_name: bank ?? undefined,
                      card_holder: row.card_holder,
                      card_number: row.card_number,
                      currency: row.currency,
                      id: row.id,
                    });
                    setOpen(true);
                  }}
                  sx={{
                    color: "primary.main",
                    marginLeft: "5px",
                    ":hover": {
                      color: "#2c269a",
                    },
                  }}
                >
                  <EditIcon sx={{ fontSize: "23px" }} />
                </IconButton>
              </Box>
            );
          },
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("card_number")}
                </P>
                <FormTextInput
                  control={control}
                  name="card_number"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
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
                  sx={{ textWrap: "nowrap", paddingBottom: "17px" }}
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
        (user?.permissions.includes("banks_update") ||
          user?.permissions.includes("users_card.block") ||
          user?.permissions.includes("users_card.unblock")) && {
          column: "is_blocked",
          renderComponent: (row: BankCardsDetalis) => {
            const canBlock = user?.permissions.includes("users_card.block");
            const canUnblock = user?.permissions.includes("users_card.unblock");

            if (!row.is_blocked && canBlock) {
              return (
                <Button
                  variant="error"
                  text={t("block")}
                  sx={{ width: "130px" }}
                  onClick={() => handleBlockCard?.(row.id)}
                />
              );
            }

            if (row.is_blocked && canUnblock) {
              return (
                <Button
                  variant="outlined"
                  text={t("unblock")}
                  sx={{ width: "130px" }}
                  onClick={() => handleUnblockCard?.(row.id)}
                />
              );
            }

            return null;
          },
        },
      ].filter(Boolean) as IColumn<BankCardsDetalis>[],
    [user?.permissions, banks]
  );

  const handleUnblockCard = (id?: number) => {
    if (user?.id && id) {
      dispatch(unblockCardThunk(id))
        .unwrap()
        .then(() => {
          dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
          enqueueSnackbar("Карта разблокировано", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  const handleBlockCard = (id?: number) => {
    if (user?.id && id) {
      dispatch(blockCardThunk(id))
        .unwrap()
        .then(() => {
          dispatch(getBankCardsThunk({ page: page, per_page: 20 }));

          enqueueSnackbar("Карта заблокировано", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
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
            paddingTop: "8px",
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

  const onSubmit = form.handleSubmit(
    async ({ id, bank_name, currency, card_number, card_holder }) => {
      try {
        await dispatch(
          changeAndReassignCardThunk({
            bank_detail_id: id,
            bank_name: bank_name.name,
            card_number,
            currency: currency as "RUB" | "USD" | "EUR",
            card_holder,
          })
        ).unwrap();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOpen(false);
      }
    }
  );

  return {
    bankCards,
    loading,
    total,
    setPage,
    onChangePage,
    open,
    setOpen,
    page,
    columns,
    user,
    onSubmit,
    banks,
    control: form.control,
    errors: form.formState.errors,
  };
};

export default useBankCardList;
