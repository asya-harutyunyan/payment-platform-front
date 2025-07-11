import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useUserContext } from "@/context/single.user.page/user.context";
import { new_users_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  downloadReportThunk,
  getReportUsersThunk,
} from "@/store/reducers/user-info/reportSlice/thunks";
import {
  EReportFormats,
  EReportKeys,
  ReportUsers,
} from "@/store/reducers/user-info/reportSlice/types";
import { P } from "@/styles/typography";
import { downloadFileWithURL } from "@/utils";
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

type NewUserFormData = z.infer<typeof new_users_schema>;

const useReports = () => {
  const { goToUserPage } = useUserContext();

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [sortUsers, setSortUsers] = useState<"ASC" | "DESC">("DESC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  //reporst users
  const { control: UserControl, watch: UserWatch } = useForm<NewUserFormData>({
    resolver: zodResolver(new_users_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      from: undefined,
      to: undefined,
    },
  });

  //reporst users
  const nameUser = UserWatch("name");
  const surnameUser = UserWatch("surname");
  const emailUser = UserWatch("email");
  const from = UserWatch("from");
  const to = UserWatch("to");

  const [debouncedNameUser] = useDebounce(nameUser, 700);
  const [debouncedSurnameUser] = useDebounce(surnameUser, 700);
  const [debouncedEmailUser] = useDebounce(emailUser, 700);
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

    dispatch(
      getReportUsersThunk({
        page,
        per_page: 20,
        name: debouncedNameUser,
        surname: debouncedSurnameUser,
        email: debouncedEmailUser,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        sort: sortUsers,
      })
    );
  }, [
    debouncedNameUser,
    debouncedTo,
    debouncedFrom,
    debouncedSurnameUser,
    debouncedEmailUser,
    sortUsers,
    page,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };

  const onChangeReportUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage?.(page);
  };

  const onDownloadClick = async (format: EReportFormats) => {
    const { url, filename } = await dispatch(
      downloadReportThunk({ key: EReportKeys.by_users, format })
    ).unwrap();

    downloadFileWithURL(url, filename);
  };

  const columnsReportUsers = useMemo<IColumn<ReportUsers>[]>(
    () => [
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("sort_by_created_at")} </P>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <MonthPicker
                  name="from"
                  control={UserControl}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
                <MonthPicker
                  name="to"
                  control={UserControl}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
              </Box>
              {sortUserComponent()}{" "}
            </Box>
          </Box>
        ),
        renderComponent: (row: ReportUsers) => {
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
        column: "name",
        renderComponent: (row: ReportUsers) => {
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
              {row.name}
            </P>
          );
        },

        filters: () => {
          return (
            <FormTextInput
              control={UserControl}
              name="name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "surname",
        valueKey: "surname",
        filters: () => {
          return (
            <FormTextInput
              control={UserControl}
              name="surname"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "email",
        valueKey: "email",
        filters: () => {
          return (
            <FormTextInput
              control={UserControl}
              name="email"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "blocked_cards",
        valueKey: "blocked_cards",
      },

      {
        column: "total_cards",
        valueKey: "total_cards",
      },
      //
      {
        column: "earned_amount",
        valueKey: "earned_amount",
      },

      {
        column: "deposit_amount",
        valueKey: "deposit_amount",
      },
      {
        column: "paid_amount",
        valueKey: "paid_amount",
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
  const sortUserComponent = () => {
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
            onClick={() => setSortUsers("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSortUsers("DESC")}
          />
        </Box>
      </Box>
    );
  };
  return {
    sortComponent,
    columnsReportUsers,
    handleChange,
    onChangeReportUsersPage,
    orders_stats,
    totalDeposits,
    loadingDeposits,
    report_users,
    adminSummary,
    dispatch,
    page,
    setPage,
    selectedTab,
    setSelectedTab,
    value,
    setValue,
    onDownloadClick,
    sort,
    setSort,
  };
};

export default useReports;
