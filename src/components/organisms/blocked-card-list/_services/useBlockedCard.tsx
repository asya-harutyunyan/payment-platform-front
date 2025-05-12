import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { blocked_card_schema } from "@/schema/blocked_card_schena";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBlockedCardsThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof blocked_card_schema>;

const useBlockedCard = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const { goToUserPage } = useUserContext();

  const { user } = useAuth();

  const { blockedCards, loading, total } = useAppSelector(
    (state) => state.bankDetails
  );
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(blocked_card_schema),
    defaultValues: {
      name: "",
      surname: "",
      bank_name: "",
      card_holder: "",
      currency: "",
      card_number: "",
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const bankName = watch("bank_name");
  const cardHolder = watch("card_holder");
  const cardNumber = watch("card_number");
  const currency = watch("currency");
  const month = watch("month");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedBankName] = useDebounce(bankName, 700);
  const [debouncedCardHolder] = useDebounce(cardHolder, 700);
  const [debouncedCardNumber] = useDebounce(cardNumber, 700);
  const [debouncedCurrency] = useDebounce(currency, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );

  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        getBlockedCardsThunk({
          page: page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          bank_name: debouncedBankName,
          card_holder: debouncedCardHolder,
          card_number: debouncedCardNumber,
          currency: debouncedCurrency,
          month: "",
          sort,
        })
      );
    } else {
      dispatch(
        getBlockedCardsThunk({
          page: page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          bank_name: debouncedBankName,
          card_holder: debouncedCardHolder,
          card_number: debouncedCardNumber,
          currency: debouncedCurrency,
          month: debouncedMonth,
          sort,
        })
      );
    }
  }, [
    debouncedBankName,
    debouncedMonth,
    debouncedCardHolder,
    debouncedCardNumber,
    debouncedName,
    debouncedSurname,
    debouncedCurrency,
    page,
    sort,
  ]);

  useEffect(() => {
    dispatch(getBlockedCardsThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getBlockedCardsThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<BankCardsDetalis>[]>(
    () => [
      {
        column: "name",
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
              {row?.user?.name}
            </P>
          );
        },
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("name")}
              name="name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "surname",
        valueKey: "user.surname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("surname")}
              name="surname"
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
        column: "card_holder",
        valueKey: "card_holder",
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
        column: "card_number",
        valueKey: "card_number",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="card_number"
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
    ],
    []
  );
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
    dispatch,
    page,
    setPage,
    columns,
    onChangePage,
    blockedCards,
    loading,
    total,
  };
};

export default useBlockedCard;
