import { Box, Tab, Tabs } from "@mui/material";
import { FC, ReactNode, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface ITabItems {
  id: number;
  label: string;
}
interface ITabContent {
  id: number;
  content: ReactNode | null;
}
interface IBasicTabs {
  tabs: ITabItems[];
  content: ITabContent[];
}
export const BasicTabs: FC<IBasicTabs> = ({ tabs, content }) => {
  const [filter, setFilter] = useState("all");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
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
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={filter} onChange={handleChange} centered>
          <Tab label="All" value={"all"} />
          <Tab label="Pending" value="pending" />
          <Tab label="Done" value="done" />
        </Tabs>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((item: ITabItems, index: number) => {
            return <Tab label={item.label} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      {content.map((item: ITabContent, index: number) => {
        return (
          <CustomTabPanel value={value} index={index}>
            {item.content}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};
