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
import { NewUsers } from "@/store/reducers/user-info/reportSlice/types";
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

type NewUserFormData = z.infer<typeof new_users_schema>;

const useReports = () => {
  const { goToUserPage } = useUserContext();

  const dispatch = useAppDispatch();
  const [pageNewRegUsers, setPageNewRegUsers] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const {
    newRegisteredUsers,
    total: totalNewRegUsers,
    loading: newRegUsersloading,
    admingetProcessedAmounts,
  } = useAppSelector((state) => state.reports);
  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  //report new reg users
  const {
    control: NewUserControl,
    register: NewUserRegister,
    watch: NewUserWatch,
  } = useForm<NewUserFormData>({
    resolver: zodResolver(new_users_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      from: undefined,
      to: undefined,
    },
  });

  const name = NewUserWatch("name");
  const surname = NewUserWatch("surname");
  const email = NewUserWatch("email");
  const from = NewUserWatch("from");
  const to = NewUserWatch("to");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
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

    dispatch(
      newRegisteredUsersThunk({
        page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        email: debouncedEmail,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        sort,
      })
    );
  }, [
    debouncedName,
    debouncedSurname,
    debouncedEmail,
    debouncedTo,
    debouncedFrom,
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

  const columnsNewRegUsers = useMemo<IColumn<NewUsers>[]>(
    () => [
      {
        column: "name",
        renderComponent: (row: NewUsers) => {
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
              control={NewUserControl}
              {...NewUserRegister("name")}
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
              control={NewUserControl}
              {...NewUserRegister("surname")}
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
              control={NewUserControl}
              {...NewUserRegister("email")}
              name="email"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },

      {
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("created_at")}</P>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <MonthPicker
                name="from"
                control={NewUserControl}
                label={t("from")}
                onOpen={() => setIsDatePickerOpen(true)}
                onClose={() => setIsDatePickerOpen(false)}
              />
              <MonthPicker
                name="to"
                control={NewUserControl}
                label={t("to")}
                onOpen={() => setIsDatePickerOpen(true)}
                onClose={() => setIsDatePickerOpen(false)}
              />
            </Box>
          </Box>
        ),
        valueKey: "created_at",
      },
      {
        column: () => sortComponent(),
        renderComponent: (row: NewUsers) => {
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
    ],
    []
  );

  useEffect(() => {
    dispatch(
      newRegisteredUsersThunk({
        page: pageNewRegUsers,
        per_page: 20,
        sort,
      })
    );
  }, [page, sort]);

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

  return {
    fetchDataByTab,
    sortComponent,
    columnsNewRegUsers,
    newRegisteredUsers,
    pageNewRegUsers,
    handleChange,
    onChangePageNewUsers,
    onChangeReportUsersPage,
    totalNewRegUsers,
    newRegUsersloading,
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
    admingetProcessedAmounts,
  };
};

export default useReports;
