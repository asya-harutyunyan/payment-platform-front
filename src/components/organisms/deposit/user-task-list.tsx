import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

export const UserTaskListComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={t("task_list")} />
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
          overflowX: "auto",
        }}
      ></Box>
    </Box>
  );
};
