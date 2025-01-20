import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
type ITabsPanel = {
  id: number;
  component: ReactNode;
};
type ITabNames = {
  id: number;
  name: string;
};
interface ITabsComponent {
  tabPanel: ITabsPanel[];
  tabNames: ITabNames[];
}
export const TabsComponent: FC<ITabsComponent> = ({ tabPanel, tabNames }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabNames.map((item, index) => {
          return (
            <Tab
              key={index}
              color="primary.main"
              sx={{ color: "primary.main" }}
              label={t(item.name)}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
      <Box sx={{ width: "100%" }}>
        {tabPanel.map((item, index) => {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              {item.component}
            </CustomTabPanel>
          );
        })}
      </Box>
    </Box>
  );
};
