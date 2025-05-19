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
import { Box } from "@mui/material";
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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

type FormData = z.infer<typeof bank_card_schema>;

const useBankCardList = () => {
  const { goToUserPage } = useUserContext();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { bankCards, loading, total } = useAppSelector(
    (state) => state.bankDetails
  );
  useEffect(() => {
    dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
  };
  const { control, register, watch } = useForm<FormData>({
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
    if (isDatePickerOpen) return;
    const isValidRange =
      dayjs(debouncedFrom).isValid() || dayjs(debouncedTo).isValid();
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
          column: "card_holder",
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
                onClick={() => row.id && goToUserPage(row.id)}
              >
                {row.card_holder}
              </P>
            );
          },
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="card_holder"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "name_user",
          valueKey: "user.name",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="name"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "bank_name",
          valueKey: "bank_name",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="bank_name"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "card_number",
          valueKey: "card_number",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("card_number")}
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
        {
          column: () => (
            <Box>
              <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <MonthPicker
                      name="from"
                      control={control}
                      onOpen={() => setIsDatePickerOpen(true)}
                      onClose={() => setIsDatePickerOpen(false)}
                    />
                    <MonthPicker
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
      ].filter(Boolean) as IColumn<BankCardsDetalis>[],
    [user?.permissions]
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
  return {
    bankCards,
    loading,
    total,
    setPage,
    onChangePage,
    page,
    columns,
    user,
  };
};

export default useBankCardList;
