import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getSingleOrderThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../paper/paper";
import { fields } from "./columns";

export const OrderInfoUser: FC = () => {
  const { singleOrder, loading } = useAppSelector((state) => state.deposit);
  const { id } = useParams({ from: "/_auth/_user/orders/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
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
      {!singleOrder ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleOrder}
            fields={fields}
            title={"orders_information"}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};
