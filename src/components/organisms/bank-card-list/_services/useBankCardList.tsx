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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

type FormData = z.infer<typeof bank_card_schema>;

const useBankCardList = () => {
  const { goToUserPage } = useUserContext();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
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
    },
  });
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const CardHolder = watch("card_holder");
  const BankName = watch("bank_name");
  const Currency = watch("currency");
  const CardNumber = watch("card_number");
  const month = watch("month");
  const name = watch("name");

  const [debounceCardHolder] = useDebounce(CardHolder, 700);
  const [debouncedBankName] = useDebounce(BankName, 700);
  const [debouncedCardNumber] = useDebounce(CardNumber, 700);
  const [debouncedCurrency] = useDebounce(Currency, 700);
  const [debouncedName] = useDebounce(name, 700);

  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );

  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        getBankCardsThunk({
          page: page,
          per_page: 20,
          card_holder: debounceCardHolder,
          card_number: debouncedCardNumber,
          bank_name: debouncedBankName,
          currency: debouncedCurrency,
          name: debouncedName,
          month: "",
          sort,
        })
      );
    } else {
      dispatch(
        getBankCardsThunk({
          page: page,
          per_page: 20,
          card_holder: debounceCardHolder,
          card_number: debouncedCardNumber,
          bank_name: debouncedBankName,
          currency: debouncedCurrency,
          name: debouncedName,
          month: debouncedMonth,
          sort,
        })
      );
    }
  }, [
    debouncedBankName,
    debounceCardHolder,
    debouncedMonth,
    debouncedCardNumber,
    debouncedCurrency,
    debouncedName,
    page,
    sort,
  ]);

  const columns = useMemo<IColumn<BankCardsDetalis>[]>(
    () =>
      [
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
          column: "currency",
          valueKey: "currency",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="currency"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
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
              <Box sx={{ display: "flex" }}>
                <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
                {sortComponent()}
              </Box>
              <MonthPicker name="month" control={control} />
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
                  {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
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
