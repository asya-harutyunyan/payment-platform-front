import Button from "@/components/atoms/button";
import { PaginationOutlined } from "@/components/atoms/pagination";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { ITaskTable } from "./types";

const CardsContainer = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "start",
  paddingLeft: "20px",
  width: "17%",
  height: "100%",
  flexDirection: "column",
};
const EmailContainer = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "start",
  paddingLeft: "20px",
  width: "30%",
  height: "100%",
  flexDirection: "column",
};

const TaskTable: FC<ITaskTable> = ({ data }) => {
  return (
    <Box
      style={{ borderRadius: 8 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {
          lg: "100%",
          md: "100%",
          sx: "800px",
          xs: "800px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: "300px",
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
            {task.name && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  {t("name")}
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.name}
                </P>
              </Box>
            )}
            {task.surname && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  {t("surname")}
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.surname}
                </P>
              </Box>
            )}
            {task.email && (
              <Box sx={EmailContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  {t("email")}
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {task.email}
                </P>
              </Box>
            )}
            {task.role && (
              <Box sx={CardsContainer}>
                <P
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  fontWeight="400"
                >
                  {t("role")}
                </P>
                <P
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  fontWeight="300"
                >
                  {" "}
                  {task.role}
                </P>
              </Box>
            )}
            {task.name && (
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
