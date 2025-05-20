import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import { getFreezeUserThunk } from "@/store/reducers/allUsersSlice/thunks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../../molecules/paper/paper";
import { fields } from "./columns";

export const FreezeUserInfo: FC = () => {
  const { freezedUser, loading } = useAppSelector((state) => state.users);
  const { id } = useParams({ from: "/_auth/_admin/freezed-user-list/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getFreezeUserThunk(Number(id)));
  }, [dispatch, id]);

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
      {!freezedUser ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={freezedUser}
            loading={loading}
            fields={fields}
            title={"Список замароженных пользовательей"}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "90%" }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};
