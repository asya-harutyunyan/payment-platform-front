import Button from "@/components/atoms/button";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { ITaskTable } from "./types";
import { getUsersThunk } from "@/store/reducers/usersSlice/thunks";

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

const TaskTable: FC<ITaskTable> = ({ data, setPage }) => {
  const { total } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getUsersThunk({ page }));
    console.log(event);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleUserInformation = (id: number) => {
    navigate({ to: `/user-list/${id}` });
  };
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
        {data &&
          data?.map((item, index) => (
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
              onClick={() => handleUserInformation(item.id)}
            >
              {item.name && (
                <Box sx={CardsContainer}>
                  <P
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: "18px",
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
                    {item.name}
                  </P>
                </Box>
              )}
              {item.surname && (
                <Box sx={CardsContainer}>
                  <P
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: "18px",
                    }}
                    fontWeight="400"
                  >
                    {t("surname")}
                  </P>
                  <P
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "18px",
                    }}
                    fontWeight="300"
                  >
                    {item.surname}
                  </P>
                </Box>
              )}
              {item.email && (
                <Box sx={EmailContainer}>
                  <P
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: "18px",
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
                    {item.email}
                  </P>
                </Box>
              )}
              {item.role && (
                <Box sx={CardsContainer}>
                  <P
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: "18px",
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
                    {item.role && t("role")}
                  </P>
                </Box>
              )}
              {item.name && (
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
          <PaginationOutlined onPageChange={onChangePage} count={total} />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskTable;
