import TaskTable from "@/components/molecules/cards";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { FC } from "react";

const tasks = [
  {
    taskName: "Status",
    description: "Like (task for checking)",
    leadTime: "1 hour",
    instruction: "view instruction",
    price: "10 GRAND",
    availableTasks: 10,
  },
];
const titles = [
  { id: Math.random(), name: "TASK NAME" },
  { id: Math.random(), name: "DESCRIPTION" },
  { id: Math.random(), name: "INSTRUCTION" },
  { id: Math.random(), name: "PRICE" },
  { id: Math.random(), name: "AVAILABLE TASKS" },
];
export const UserTaskListComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={"Task List"} subTitle={"Lorem ipsum"} />
      <TaskTable titles={titles} data={tasks} bg={"dark"} />
    </Box>
  );
};
