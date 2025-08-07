import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { RoleOptions } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { history_schema } from "@/schema/history_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDepositsHistoryAdminThunk } from "@/store/reducers/user-info/depositSlice/thunks";
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

const useHistoryDeposit = () => {
  const { depositHistory, lastPage, loading } = useAppSelector(
    (state) => state.deposit
  );

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { user } = useAuth();
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(history_schema),
    defaultValues: {
      by_fullname: "",
      by_email: "",
      to_fullname: "",
      to_email: "",
      action: "",
      role: "",
      date: "",
      from: undefined,
      to: undefined,
    },
  });

  const by_name = watch("by_fullname");
  const by_email = watch("by_email");
  const to_name = watch("to_fullname");
  const to_email = watch("to_email");
  const role = watch("role");
  const action = watch("action");
  const date = watch("date");
  const from = watch("from");
  const to = watch("to");

  const [debounceByName] = useDebounce(by_name, 700);
  const [debouncedByEmail] = useDebounce(by_email, 700);

  const [debouncedToName] = useDebounce(to_name, 700);
  const [debouncedToEmail] = useDebounce(to_email, 700);
  const [debouncedAction] = useDebounce(action, 700);
  const [debouncedRole] = useDebounce(role, 700);
  const [debouncedDate] = useDebounce(date, 700);

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
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();

    const role = debouncedRole === "all" ? "" : debouncedRole;

    dispatch(
      getDepositsHistoryAdminThunk({
        page,
        per_page: 20,
        by_fullname: debounceByName,
        by_email: debouncedByEmail,
        to_email: debouncedToEmail,
        to_fullname: debouncedToName,
        action: debouncedAction,
        role: role,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        date: debouncedDate,
        sort,
      })
    );
  }, [
    debounceByName,
    debouncedByEmail,
    debouncedToEmail,
    debouncedTo,
    debouncedFrom,
    sort,
    page,
    debouncedToName,
    debouncedAction,
    debouncedRole,
    debouncedDate,
  ]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };

  const columns = useMemo<IColumn<HistoryRequest>[]>(
    () => [
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("date")} </P>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                {dayjs(row.date).format("DD.MM.YYYY HH:mm")}
              </P>
            </Box>
          );
        },
      },

      {
        column: "by_fullname",
        valueKey: "by_fullname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="by_fullname"
              width="130px"
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
              width="130px"
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
        column: "to_fullname",
        valueKey: "to_fullname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              name="to_fullname"
              width="130px"
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
              width="130px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "action",
        valueKey: "action",
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
    depositHistory,
    lastPage,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
  };
};
export default useHistoryDeposit;
