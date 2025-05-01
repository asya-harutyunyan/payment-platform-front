import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../../molecules/paper/paper";
import { fields } from "./columns";
import { getSingleOrderThunk } from "@/store/reducers/user-info/orderSlice/thunks";

export const OrderInfo: FC = () => {
  const { singleOrder, loading } = useAppSelector((state) => state.order);
  const { id } = useParams({ from: "/_auth/_admin/order-list/$id" });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
  }, [dispatch, id]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
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
          title={t("order_list")}
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
            title={"orders_information_single"}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};
