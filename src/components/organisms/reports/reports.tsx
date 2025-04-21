import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";

import {
  GetPlatformXThunk,
  getReportUsersThunk,
  getSummaryThunk,
  newRegisteredUsersThunk,
} from "@/store/reducers/user-info/reportSlice/thunks";
import {
  NewUsers,
  ReportUsers,
} from "@/store/reducers/user-info/reportSlice/types";
import { H5, P } from "@/styles/typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";
interface TabContentConfig {
  label: string;
  render: () => React.ReactNode;
}

export const Reports: FC = () => {
  const { newRegisteredUsers, total, loading } = useAppSelector(
    (state) => state.reports
  );
  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);

  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };
  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(newRegisteredUsersThunk({ page: page, per_page: 5, sort: sort }));
  };
  console.log(adminSummary);

  const columnsNewRegUsers = useMemo<IColumn<NewUsers>[]>(
    () => [
      {
        column: "created_at",
        valueKey: "created_at",
      },
      {
        column: "name",
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );
  const columnsReportUsers = useMemo<IColumn<ReportUsers>[]>(
    () => [
      {
        column: "name",
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
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
        column: "wallet_total",
        valueKey: "wallet_total",
      },
    ],
    []
  );

  useEffect(() => {
    // dispatch(newRegisteredUsersThunk({ page: page, per_page: 5, sort: sort }));
    // dispatch(getReportUsersThunk({ page: page, per_page: 5 }));
    // dispatch(getSummaryThunk({ page: page, per_page: 5 }));
    // dispatch(
    //   GetPlatformXThunk({
    //     page: 1,
    //     per_page: 5,
    //     start_date: "",
    //     end_date: "",
    //   })
    // );
    fetchDataByTab(selectedTab, page, sort);
  }, [page, sort, selectedTab]);

  const fetchDataByTab = (tab: number, page: number, sort: "ASC" | "DESC") => {
    switch (tab) {
      case 0:
        return dispatch(newRegisteredUsersThunk({ page, per_page: 5, sort }));
      case 1:
        return dispatch(getReportUsersThunk({ page, per_page: 5 }));
      case 2:
        return dispatch(getSummaryThunk());
      case 3:
        return dispatch(
          GetPlatformXThunk({
            page: 1,
            per_page: 5,
            start_date: "",
            end_date: "",
          })
        );
      default:
        return;
    }
  };

  const loadingAndTotal = useMemo(() => {
    switch (selectedTab) {
      case 0:
        return {
          loading,
          total,
        };
      case 1:
        return {
          loading: loadingDeposits,
          total: totalDeposits,
        };
      case 2:
        return {
          loading: loadingDeposits,
          total: totalDeposits,
        };
      case 3:
        return {
          loading: loadingDeposits,
          total: totalDeposits,
        };
      default:
        return {
          loading: true,
          total: 0,
        };
    }
  }, [selectedTab, loading, total, loadingDeposits, totalDeposits]);

  const tabContents: TabContentConfig[] = [
    {
      label: "Отчет о новых регистрациях",
      render: () =>
        newRegisteredUsers.length > 0 ? (
          <>
            <DynamicTable
              columns={columnsNewRegUsers}
              data={newRegisteredUsers}
              renderSortComponent={sortComponent()}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </>
        ) : (
          <EmptyComponent text="no_data" />
        ),
    },
    {
      label: "Отчёт по пользователям",
      render: () =>
        report_users.length > 0 ? (
          <>
            <DynamicTable columns={columnsReportUsers} data={report_users} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </>
        ) : (
          <EmptyComponent text="no_data" />
        ),
    },
    {
      label: "Отчёт по обработанным суммам",
      render: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Активные карты:{" "}
            </H5>
            <P>{adminSummary.active_cards ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Суммы депозитов:{" "}
            </H5>
            <P>{adminSummary.deposited_amounts ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              {" "}
              Просроченная сумма:{" "}
            </H5>
            <P>{adminSummary.expiredAmount ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              {" "}
              Сумма еще не внесена:{" "}
            </H5>
            <P>{adminSummary.not_deposited_yet_amount ?? 0}₽</P>
          </Box>
        </Box>
      ),
    },
    {
      label: "Взаимодействие с платформой ",
      render: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Отправленные заказы:{" "}
            </H5>
            <P>{orders_stats.order_count ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Общая сумма заказов:{" "}
            </H5>
            <P>{orders_stats.total_amount ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              {" "}
              Сумма по выданным заказам:{" "}
            </H5>
            <P>{orders_stats.total_amount_with_deposit ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Сумма подтвержденных заказов:{" "}
            </H5>
            <P>{orders_stats.total_done_ammount ?? 0}₽</P>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <H5 color="primary.main" paddingRight={"5px"}>
              Заказы без карты:{" "}
            </H5>
            <P>{orders_stats.order_witouth_card_count ?? 0}₽</P>
          </Box>
        </Box>
      ),
    },
  ];

  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "7px",
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
    );
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("reports_title")} />
      {loadingAndTotal.loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              color: "black",
              backgroundColor: "#f6f6f6",
              width: "100%",
            }}
          >
            {tabContents.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
                sx={{ fontSize: "0.8rem", color: "black" }}
              />
            ))}
          </Tabs>
          <Box
            role="tabpanel"
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
            sx={{ padding: 2 }}
          >
            {tabContents[value].render()}
          </Box>
        </Box>
      )}
    </Box>
  );
};
