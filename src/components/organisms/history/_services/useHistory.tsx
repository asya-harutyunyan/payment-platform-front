import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { RoleOptions } from "@/components/utils/status-color";
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
import { t } from "i18next";
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
    const role = debouncedRole === "all" ? "" : debouncedRole;

    if (!isValidMonth) {
      dispatch(
        historyThunk({
          page,
          per_page: 20,
          by_name_surname: debounceByName,
          by_email: debouncedByEmail,
          to_email: debouncedToEmail,
          to_name_surname: debouncedToName,
          action: debouncedAction,
          role: role,
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
          by_name_surname: debounceByName,
          by_email: debouncedByEmail,
          to_email: debouncedToEmail,
          to_name_surname: debouncedToName,
          action: debouncedAction,
          role: role,
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
        by_name_surname: debounceByName,
        by_email: debouncedByEmail,
        to_email: debouncedToEmail,
        to_name_surname: debouncedToName,
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
        column: "by_name_surname",
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
        valueKey: "role",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("role")}
              </P>
              <SelectFieldWith
                placeholder={""}
                name="role"
                control={control}
                options={RoleOptions}
                height="43px"
              />
            </Box>
          );
        },
      },
      {
        column: "to_name_surname",
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
            <P fontWeight={"bold"}>{t("sort_by_created_at")} </P>

            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MonthPicker name="month" control={control} />
                <MonthPicker name="month" control={control} />
              </Box>
              {sortComponent()}{" "}
            </Box>
          </Box>
        ),
        renderComponent: (row: HistoryRequest) => {
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
