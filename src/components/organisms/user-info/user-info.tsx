import Button from "@/components/atoms/button";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getUserThunk } from "@/store/reducers/usersSlice/thunks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, Paper, Typography } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
export const UserInfo: FC = () => {
  const { user } = useAppSelector((state) => state.users);
  const { id } = useParams({ from: "/_auth/_admin/user-list/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getUserThunk(Number(id)));
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
        {" "}
        {canGoBack && (
          <Button
            onClick={() => router.history.back()}
            variant={"outlined"}
            text={t("back")}
            sx={{ height: "30px", fontSize: "15px", color: "primary.main" }}
            icon={ArrowLeftIcon}
          />
        )}
        <TaskHeader
          title={t("user_info")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "start", marginTop: 3 }}>
        <Paper
          sx={{
            padding: 3,
            width: "100%",
            maxWidth: 800,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              textAlign: "start",
              marginBottom: 3,
            }}
          >
            User Information
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 2fr",
              },
              gap: 2,
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Name:</Typography>
            <Typography sx={{ color: "main.primary" }}>
              {user?.name} {user?.surname}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Role:</Typography>
            <Typography sx={{ color: "main.primary" }}>{user?.role}</Typography>

            <Typography sx={{ fontWeight: 500 }}>Email:</Typography>
            <Typography sx={{ color: "main.primary" }}>
              {user?.email}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
