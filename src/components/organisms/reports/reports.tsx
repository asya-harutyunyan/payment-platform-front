import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";

import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import useReports from "./_services/useReports";

export const Reports: FC = () => {
  const {
    fetchDataByTab,
    loadingAndTotal,
    tabContents,
    handleChange,
    page,
    selectedTab,
    value,
    sort,
  } = useReports();

  useEffect(() => {
    fetchDataByTab(selectedTab, page, sort);
  }, [page, sort, selectedTab]);

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
