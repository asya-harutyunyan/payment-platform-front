import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import React, { FC, SyntheticEvent, useMemo, useState } from "react";
import { OrdersHistoryPage } from "../orders-history";
import { PartnerProgramComponent } from "../partner-program/partner-program";

function a11yProps(index: number) {
  return {
    id: `partner-tab-${index}`,
    "aria-controls": `partner-tabpanel-${index}`,
  };
}

type TabPanelProps = {
  value: number;
  index: number;
  children?: React.ReactNode;
};

const TabPanel: FC<TabPanelProps> = ({ value, index, children }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`partner-tabpanel-${index}`}
    aria-labelledby={`partner-tab-${index}`}
    style={{ width: "100%" }}
  >
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

export const PartnersPage: FC<{ initialTab?: "orders" | "program" }> = ({
  initialTab = "orders",
}) => {
  const initialValue = useMemo(
    () => (initialTab === "program" ? 1 : 0),
    [initialTab]
  );
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (_e: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "95%" }}>
        <Box
          sx={{
            borderBottom: "1px solid #041F44",
            backgroundColor: "white",
            opacity: 0.6,
            p: "16px",
            borderRadius: "16px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              ".MuiTabs-list": {
                overflowX: "auto",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "black",
                borderRadius: "8px 8px 0 0",
                marginRight: "8px",
              },
              "& .Mui-selected": {
                color: "#000 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#6BADFC",
                height: "5px",
                borderRadius: "3px",
              },
            }}
          >
            <Tab label={t("referrals")} {...a11yProps(0)} />
            <Tab label={t("payment_requests")} {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <PartnerProgramComponent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrdersHistoryPage />
        </TabPanel>
      </Box>
    </Box>
  );
};
