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

  const { orders_stats, total, loading, report_users, adminSummary } =
    useAppSelector((state) => state.reports);

  //reporst users
  const { control: UserControl, watch: UserWatch } = useForm<NewUserFormData>({
    resolver: zodResolver(new_users_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      from: undefined,
      to: undefined,
      blocked_cards: "",
      total_cards: "",
      earned_amount: "",
      deposit_amount: "",
      paid_amount: "",
    },
  });

  const nameUser = UserWatch("name");
  const surnameUser = UserWatch("surname");
  const emailUser = UserWatch("email");
  const from = UserWatch("from");
  const to = UserWatch("to");
  const blocked_cards = UserWatch("blocked_cards");
  const total_cards = UserWatch("total_cards");
  const earned_amount = UserWatch("earned_amount");
  const paid_amount = UserWatch("paid_amount");
  const deposit_amount = UserWatch("deposit_amount");

  const [debouncedNameUser] = useDebounce(nameUser, 700);
  const [debouncedSurnameUser] = useDebounce(surnameUser, 700);
  const [debouncedEmailUser] = useDebounce(emailUser, 700);

  const [debouncedBlockedCards] = useDebounce(blocked_cards, 700);
  const [debouncedTotalCards] = useDebounce(total_cards, 700);
  const [debouncedEarnedAmount] = useDebounce(earned_amount, 700);
  const [debouncedPaidAmount] = useDebounce(paid_amount, 700);
  const [debouncedDepositAmount] = useDebounce(deposit_amount, 700);

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
        blocked_card: debouncedBlockedCards,
        total_card: debouncedTotalCards,
        earned_amount: debouncedEarnedAmount,
        paid_amount: debouncedPaidAmount,
        deposit_amount: debouncedDepositAmount,
      })
    );
  }, [
    debouncedNameUser,
    debouncedTo,
    debouncedFrom,
    debouncedSurnameUser,
    debouncedEmailUser,
    debouncedBlockedCards,
    debouncedTotalCards,
    debouncedEarnedAmount,
    debouncedPaidAmount,
    debouncedDepositAmount,
    sortUsers,
    page,
    isDatePickerOpen,
  ]);
  useEffect(() => {
    console.log(report_users, "report_users");
  }, [report_users]);

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
      downloadReportThunk({
        key: EReportKeys.by_users,
        format,
        from: debouncedFrom,
        to: debouncedTo,
        email: emailUser,
        name: nameUser,
        surname: surnameUser,
      })
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
                  width="130px"
                  name="from"
                  control={UserControl}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
                <MonthPicker
                  width="130px"
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
              width="130px"
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
              width="130px"
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
              width="130px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        valueKey: "blocked_cards",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("blocked_cards")}
              </P>
              <FormTextInput
                control={UserControl}
                name="blocked_cards"
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            </Box>
          );
        },
      },

      {
        valueKey: "total_cards",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("total_cards")}
              </P>
              <FormTextInput
                control={UserControl}
                name="total_cards"
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            </Box>
          );
        },
      },
      //
      {
        valueKey: "earned_amount",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("earned_amount")}
              </P>
              <FormTextInput
                control={UserControl}
                name="earned_amount"
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            </Box>
          );
        },
      },

      {
        valueKey: "deposit_amount",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("deposit_amount")}
              </P>
              <FormTextInput
                control={UserControl}
                name="deposit_amount"
                width="130px"
                style={{ input: { padding: "10px 14px" } }}
              />
            </Box>
          );
        },
      },
      {
        column: "paid_amount",
        valueKey: "paid_amount",
        filters: () => {
          return (
            <FormTextInput
              control={UserControl}
              name="paid_amount"
              width="130px"
              style={{ input: { padding: "10px 14px" } }}
            />
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
    total,
    loading,
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
