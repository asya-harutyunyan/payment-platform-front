import Button from "@/components/atoms/button";
import PaginationOutlined from "@/components/atoms/pagination";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { FC } from "react";

type Data = {
  taskName?: string;
  description?: string;
  leadTime?: string;
  instruction?: string;
  price?: string;
  availableTasks?: number;
};
type Titles = {
  id: number;
  name: string;
};
interface ITaskTable {
  titles: Titles[];
  data: Data[];
  bg: "dark" | "light";
}
const CardsContainer = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "start",
  paddingLeft: "20px",
  width: "17%",
  height: "100%",
  flexDirection: "column",
};
const TaskTable: FC<ITaskTable> = ({ data }) => {
  return (
    <Box
      style={{ borderRadius: 8 }}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.map((task, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "120px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            {task.taskName && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.taskName}
                </P>
              </Box>
            )}
            {task.description && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.description}
                </P>
              </Box>
            )}
            {task.leadTime && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.leadTime}
                </P>
              </Box>
            )}
            {task.instruction && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {" "}
                  {task.instruction}
                </P>
              </Box>
            )}
            {task.price && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.price}
                </P>
              </Box>
            )}
            {task.availableTasks && (
              <Box sx={CardsContainer}>
                {" "}
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  TASK NAME
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.availableTasks}
                </P>
              </Box>
            )}
            {task.taskName && (
              <Box sx={CardsContainer}>
                <Button
                  variant="contained"
                  text={"Status of task"}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    padding: "0 20px",
                    textTransform: "none",
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                  }}
                />
              </Box>
            )}
          </Box>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <PaginationOutlined />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskTable;
