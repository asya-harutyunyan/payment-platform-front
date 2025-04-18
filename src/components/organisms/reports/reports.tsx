import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import { newRegisteredUsersThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { NewUsers } from "@/store/reducers/user-info/reportSlice/types";
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

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(newRegisteredUsersThunk({ page: page, per_page: 5, sort: sort }));
  };

  const columns = useMemo<IColumn<NewUsers>[]>(
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

  useEffect(() => {
    dispatch(newRegisteredUsersThunk({ page: page, per_page: 5, sort: sort }));
  }, [dispatch, page, sort]);

  const tabContents: TabContentConfig[] = [
    {
      label: "Отчёт по обработанным суммам",
      render: () =>
        newRegisteredUsers.length > 0 ? (
          <>
            <DynamicTable columns={columns} data={newRegisteredUsers} />
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
    // ,
    // {
    //   label: "Отчёт по пользователям",
    //   render: () => <DynamicTable columns={depositColumns} data={deposits} />,
    // },
    // {
    //   label: "Отчет о новых регистрациях",
    //   render: () => (
    //     <DynamicTable columns={registrationColumns} data={newRegisteredUsers} />
    //   ),
    // },
    // {
    //   label: "Взаимодействие с платформой ",
    //   render: () => <EmptyComponent text="No interaction data yet." />,
    // },
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
      {loading ? (
        <CircularIndeterminate />
      ) : newRegisteredUsers.length > 0 ? (
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
          <DynamicTable
            columns={columns}
            data={newRegisteredUsers}
            renderSortComponent={sortComponent()}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
