import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useUserContext } from "@/context/single.user.page/user.context";
import { new_users_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  GetPlatformXThunk,
  getProcessedAmountsThunk,
  getReportUsersThunk,
  newRegisteredUsersThunk,
} from "@/store/reducers/user-info/reportSlice/thunks";
import { ReportUsers } from "@/store/reducers/user-info/reportSlice/types";
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

type NewUserFormData = z.infer<typeof new_users_schema>;

const useReports = () => {
  const { goToUserPage } = useUserContext();

  const dispatch = useAppDispatch();
  const [pageNewRegUsers, setPageNewRegUsers] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [sortUsers, setSortUsers] = useState<"ASC" | "DESC">("ASC");

  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);
  console.log(report_users);

  //reporst users
  const {
    control: UserControl,
    register: UserRegister,
    watch: UserWatch,
  } = useForm<NewUserFormData>({
    resolver: zodResolver(new_users_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });

  //reporst users
  const nameUser = UserWatch("name");
  const surnameUser = UserWatch("surname");
  const emailUser = UserWatch("email");
  const month = UserWatch("month");

  const [debouncedNameUser] = useDebounce(nameUser, 700);
  const [debouncedSurnameUser] = useDebounce(surnameUser, 700);
  const [debouncedEmailUser] = useDebounce(emailUser, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );
  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        getReportUsersThunk({
          page,
          per_page: 20,
          name: debouncedNameUser,
          surname: debouncedSurnameUser,
          email: debouncedEmailUser,
          month: "",
          sort: sortUsers,
        })
      );
    } else {
      dispatch(
        getReportUsersThunk({
          page,
          per_page: 20,
          name: debouncedNameUser,
          surname: debouncedSurnameUser,
          email: debouncedEmailUser,
          month: debouncedMonth,
          sort: sortUsers,
        })
      );
    }
  }, [
    debouncedNameUser,
    debouncedMonth,
    debouncedSurnameUser,
    debouncedEmailUser,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };
  const onChangePageNewUsers = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPageNewRegUsers(newPage);

    dispatch(
      newRegisteredUsersThunk({
        page: newPage,
        per_page: 20,
        sort: sort,
      })
    );
  };

  const onChangeReportUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage?.(page);
    dispatch(getReportUsersThunk({ page: page, per_page: 20 }));
  };

  const columnsReportUsers = useMemo<IColumn<ReportUsers>[]>(
    () => [
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
              {...UserRegister("name")}
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
              {...UserRegister("surname")}
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
              {...UserRegister("email")}
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
      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>Сортировка по дате</P>
            <MonthPicker name="month" control={UserControl} />
          </Box>
        ),
      },
      {
        column: () => sortUserComponent(),
      },
    ],
    []
  );

  const fetchDataByTab = (
    tab: number,
    page?: number,
    sort?: "ASC" | "DESC"
  ) => {
    switch (tab) {
      case 0:
        return (
          sort &&
          dispatch(
            newRegisteredUsersThunk({
              page: pageNewRegUsers,
              per_page: 20,
              sort,
            })
          )
        );
      case 1:
        return page && dispatch(getReportUsersThunk({ page, per_page: 20 }));
      case 2:
        return dispatch(getProcessedAmountsThunk());
      case 3:
        return dispatch(
          GetPlatformXThunk({
            page: 1,
            per_page: 20,
            start_date: "",
            end_date: "",
          })
        );
      default:
        return;
    }
  };

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
  const sortUserComponent = () => {
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
    fetchDataByTab,
    sortComponent,
    pageNewRegUsers,
    columnsReportUsers,
    handleChange,
    onChangePageNewUsers,
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
    sort,
    setSort,
  };
};

export default useReports;
