import { FormTextInput } from "@/components/atoms/input";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { blocked_card_schema } from "@/schema/blocked_card_schena";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBlockedCardsThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof blocked_card_schema>;

const useBlockedCard = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

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
      card_number: "",
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const bankName = watch("bank_name");
  const cardHolder = watch("card_holder");
  const cardNumber = watch("card_number");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedBankName] = useDebounce(bankName, 700);
  const [debouncedCardHolder] = useDebounce(cardHolder, 700);
  const [debouncedCardNumber] = useDebounce(cardNumber, 700);

  useEffect(() => {
    dispatch(
      getBlockedCardsThunk({
        page: page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        bank_name: debouncedBankName,
        card_holder: debouncedCardHolder,
        card_number: debouncedCardNumber,
        sort,
      })
    );
  }, [
    debouncedBankName,
    debouncedCardHolder,
    debouncedCardNumber,
    debouncedName,
    debouncedSurname,
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
        valueKey: "user.name",
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
              {...register("bank_name")}
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
              {...register("card_holder")}
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
              {...register("card_number")}
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
      },
      {
        column: () => sortComponent(),
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
