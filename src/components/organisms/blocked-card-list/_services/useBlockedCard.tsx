import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { CurrencyOptions } from "@/components/utils/status-color";
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
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const { goToUserPage } = useUserContext();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
      from: undefined,
      to: undefined,
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const bankName = watch("bank_name");
  const cardHolder = watch("card_holder");
  const cardNumber = watch("card_number");
  const currency = watch("currency") === "all" ? "" : watch("currency");
  const from = watch("from");
  const to = watch("to");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedBankName] = useDebounce(bankName, 700);
  const [debouncedCardHolder] = useDebounce(cardHolder, 700);
  const [debouncedCardNumber] = useDebounce(cardNumber, 700);
  const [debouncedCurrency] = useDebounce(currency, 700);
  const [debouncedFrom] = useDebounce(from, 1000);
  const [debouncedTo] = useDebounce(to, 1000);

  useEffect(() => {
    if (isDatePickerOpen) return;

    const formattedFrom =
      debouncedFrom && dayjs(debouncedFrom, "DD.MM.YYYY").isValid()
        ? dayjs(debouncedFrom).format("YYYY.MM.DD")
        : undefined;

    const formattedTo =
      debouncedTo && dayjs(debouncedTo, "DD.MM.YYYY").isValid()
        ? dayjs(debouncedTo).format("YYYY.MM.DD")
        : undefined;

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
        from: formattedFrom,
        to: formattedTo,
        sort,
      })
    );
  }, [
    debouncedBankName,
    debouncedFrom,
    debouncedTo,
    debouncedCardHolder,
    debouncedCardNumber,
    debouncedName,
    debouncedSurname,
    debouncedCurrency,
    page,
    sort,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getBlockedCardsThunk({ page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<BankCardsDetalis>[]>(
    () => [
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
              {sortComponent()}
            </Box>
          </Box>
        ),
        renderComponent: (row: BankCardsDetalis) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <P
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                paddingRight: "5px",
              }}
            >
              {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
            </P>
          </Box>
        ),
      },
      {
        column: "name",
        renderComponent: (row: BankCardsDetalis) => (
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
        ),
        filters: () => (
          <FormTextInput
            control={control}
            {...register("name")}
            name="name"
            width="200px"
            style={{ input: { padding: "10px 14px" } }}
          />
        ),
      },
      {
        column: "surname",
        valueKey: "user.surname",
        filters: () => (
          <FormTextInput
            control={control}
            {...register("surname")}
            name="surname"
            width="200px"
            style={{ input: { padding: "10px 14px" } }}
          />
        ),
      },
      {
        column: "bank_name",
        valueKey: "bank_name",
        filters: () => (
          <FormTextInput
            control={control}
            name="bank_name"
            width="200px"
            style={{ input: { padding: "10px 14px" } }}
          />
        ),
      },
      {
        column: "card_holder",
        valueKey: "card_holder",
        filters: () => (
          <FormTextInput
            control={control}
            name="card_holder"
            width="200px"
            style={{ input: { padding: "10px 14px" } }}
          />
        ),
      },
      {
        column: "card_number",
        valueKey: "card_number",
        filters: () => (
          <FormTextInput
            control={control}
            name="card_number"
            width="200px"
            style={{ input: { padding: "10px 14px" } }}
          />
        ),
      },
      {
        valueKey: "currency",
        filters: () => (
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
        ),
      },
    ],
    []
  );

  const sortComponent = () => (
    <Box sx={{ display: "flex" }}>
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
            ":hover": { backgroundColor: "#f9f9f9" },
          }}
          onClick={() => setSort("ASC")}
        />
        <ExpandMoreIcon
          sx={{
            color: "primary.main",
            height: "20px",
            ":hover": { backgroundColor: "#f9f9f9" },
          }}
          onClick={() => setSort("DESC")}
        />
      </Box>
    </Box>
  );

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
