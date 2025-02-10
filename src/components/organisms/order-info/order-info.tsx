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
import { Paper } from "../paper/user-info";

export const OrderInfo: FC = () => {
  const { singleOrder } = useAppSelector((state) => state.deposit);
  const { id } = useParams({ from: "/_auth/_admin/order-list/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleOrderThunk(Number(id)));
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
      {!singleOrder ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            user={singleOrder}
            fields={["name", "surname", "processing_amount"]}
            title={"Deposit Information"}
          />
        </Box>
      )}
    </Box>
  );
};
