import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { history_schema } from "@/schema/history_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { historyThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { HistoryRequest } from "@/store/reducers/user-info/reportSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof history_schema>;

const usePlatipayService = () => {
  const { history, history_last_page, loading } = useAppSelector(
    (state) => state.reports
  );

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  const { user } = useAuth();
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(history_schema),
    defaultValues: {
      by_name: "",
      by_surname: "",
      by_email: "",
      to_name: "",
      to_surname: "",
      to_email: "",
      action: "",
      role: "",
      date: "",
    },
  });

  const by_name = watch("by_name");
  const by_surname = watch("by_surname");
  const by_email = watch("by_email");
  const to_name = watch("to_name");
  const to_surname = watch("to_surname");
  const to_email = watch("to_email");
  const role = watch("role");
  const action = watch("action");
  const date = watch("date");
  const month = watch("month");

  const [debounceByName] = useDebounce(by_name, 700);
  const [debouncedBySurname] = useDebounce(by_surname, 700);
  const [debouncedByEmail] = useDebounce(by_email, 700);

  const [debouncedToName] = useDebounce(to_name, 700);
  const [debouncedToSurname] = useDebounce(to_surname, 700);
  const [debouncedToEmail] = useDebounce(to_email, 700);
  const [debouncedAction] = useDebounce(action, 700);
  const [debouncedRole] = useDebounce(role, 700);
  const [debouncedDate] = useDebounce(date, 700);

  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );
  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        historyThunk({
          page,
          per_page: 20,
          by_name: debounceByName,
          by_surname: debouncedBySurname,
          by_email: debouncedByEmail,
          to_email: debouncedToEmail,
          to_surname: debouncedToSurname,
          to_name: debouncedToName,
          action: debouncedAction,
          role: debouncedRole,
          month: "",
          date: debouncedDate,
          sort,
        })
      );
    } else {
      dispatch(
        historyThunk({
          page,
          per_page: 20,
          by_name: debounceByName,
          by_surname: debouncedBySurname,
          by_email: debouncedByEmail,
          to_email: debouncedToEmail,
          to_surname: debouncedToSurname,
          to_name: debouncedToName,
          action: debouncedAction,
          role: debouncedRole,
          month: debouncedMonth,
          date: debouncedDate,
          sort,
        })
      );
    }
  }, [
    debounceByName,
    debouncedBySurname,
    debouncedByEmail,
    debouncedToEmail,
    debouncedToSurname,
    debouncedMonth,
    sort,
    page,
    debouncedToName,
    debouncedAction,
    debouncedRole,
    debouncedDate,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(
      historyThunk({
        page,
        per_page: 20,
        by_name: debounceByName,
        by_surname: debouncedBySurname,
        by_email: debouncedByEmail,
        to_email: debouncedToEmail,
        to_surname: debouncedToSurname,
        to_name: debouncedToName,
        action: debouncedAction,
        role: debouncedRole,
        month: debouncedMonth,
        date: debouncedDate,
        sort,
      })
    );
  };

  const columns = useMemo<IColumn<HistoryRequest>[]>(
    () => [
      {
        column: "action",
        valueKey: "action",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="action"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },

      {
        column: "by_name",
        valueKey: "by_name",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="by_name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "by_surname",
        valueKey: "by_surname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="by_surname"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "by_email",
        valueKey: "by_email",

        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="by_email"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "date",
        valueKey: "date",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="date"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "role",
        valueKey: "role",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="role"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "to_name",
        valueKey: "to_name",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="to_name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "to_surname",
        valueKey: "to_surname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="to_surname"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "to_email",
        valueKey: "to_email",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="to_email"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>Сортировка по дате</P>
            <MonthPicker name="month" control={control} />
          </Box>
        ),
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
    history,
    history_last_page,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
  };
};
export default usePlatipayService;
