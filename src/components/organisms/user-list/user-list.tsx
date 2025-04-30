import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { CreateUser } from "@/components/molecules/create-user/create-user";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
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
    renderBottomComponent,
  } = useUserList();

  const { user } = useAuth();
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
            // overflowX: "auto",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            scrollButtons="auto"
            allowScrollButtonsMobile={true}
            sx={{
              color: "black",
              backgroundColor: "#f6f6f6",
              width: "100%",
              minWidth: {
                xs: "100%",
              },
              "& .MuiTabs-scroller": {
                "::-webkit-scrollbar": {
                  display: "none",
                },
                overflowX: {
                  xs: "scroll !important",
                },
              },
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
            <Tab
              label="Создать пользователя"
              {...a11yProps(2)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
          </Tabs>
          {value !== 2 && user?.role === "superAdmin" ? (
            <DynamicTable
              columns={columns}
              data={data}
              renderBottomComponent={renderBottomComponent}
            />
          ) : (
            <CreateUser />
          )}
          {value !== 2 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={currentPage}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
