import TaskTable from "@/components/molecules/cards";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

const tasks = [
  {
    taskName: "Status",
    description: "Like",
    leadTime: "1 hour",
    instruction: "view instruction",
    price: "10 GRAND",
    availableTasks: 10,
  },
  {
    taskName: "Status",
    description: "Like",
    leadTime: "1 hour",
    instruction: "view instruction",
    price: "10 GRAND",
    availableTasks: 10,
  },
  {
    taskName: "Status",
    description: "Like",
    leadTime: "1 hour",
    instruction: "view instruction",
    price: "10 GRAND",
    availableTasks: 10,
  },
];
const titles = [
  { id: Math.random(), name: "ORDER NAME" },
  { id: Math.random(), name: "DESCRIPTION" },
  { id: Math.random(), name: "INSTRUCTION" },
  { id: Math.random(), name: "PRICE" },
  { id: Math.random(), name: "AVAILABLE TASKS" },
  { id: Math.random(), name: "STATUS" },
];

export const OrderListComponent: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("order_list")} subTitle={"Lorem ipsum"} />
      <Box sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}>
        <TaskTable titles={titles} data={tasks} bg={"light"} />
      </Box>
    </Box>
  );
};
