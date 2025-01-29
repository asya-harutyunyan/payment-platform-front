import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";

export const UserInfo: FC = () => {
  const { user } = useAppSelector((state) => state.users);
  const params = useParams({ from: "/_auth/_admin/user/user" });

  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(getUserThunk(id));
    // console.log(params);
  }, [user]);
  return (
    <Box>
      <TaskHeader title={t("user_info")} />
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
              textAlign: "center",
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
            <Typography sx={{ color: "text.secondary" }}>
              {user?.name} {user?.surname}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Role:</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.role}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>Email:</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.email}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
