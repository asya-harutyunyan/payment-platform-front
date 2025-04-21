import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import useUserList from "./_services/useUserList";

export const UserListComponent: FC = () => {
  const {
    page,
    fetchDataByTab,
    data,
    onChangePage,
    currentPage,
    columns,
    total,
    loading,
    value,
    selectedTab,
    handleChange,
    a11yProps,
  } = useUserList();

  useEffect(() => {
    fetchDataByTab(selectedTab, page);
  }, [page, selectedTab]);

  return (
    <Box>
      <TaskHeader title={t("user_list_title")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            overflowY: "auto",
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
            <Tab
              label="Неблокированные пользователи"
              {...a11yProps(0)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
            <Tab
              label="Заблокированные пользователи"
              {...a11yProps(1)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
          </Tabs>
          <DynamicTable columns={columns} data={data} />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={currentPage}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
