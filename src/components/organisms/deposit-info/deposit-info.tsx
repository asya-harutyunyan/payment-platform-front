import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { unblockCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { getSingleDepositThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../paper/paper";
import { fields } from "./columns";

export const DepositInfo: FC = () => {
  const { singleDeposit, loading } = useAppSelector((state) => state.deposit);
  const { user } = useAuth();
  const { id } = useParams({ from: "/_auth/_admin/deposit-list/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleDepositThunk(id));
  }, [dispatch, id]);
  const handleUnblockCard = () => {
    if (user?.id) {
      dispatch(unblockCardThunk(user?.id))
        .unwrap()
        .then(() => {
          dispatch(getSingleDepositThunk(id));
        });
    }
  };
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
      {!singleDeposit ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleDeposit}
            fields={fields}
            title={"deposit_information"}
            loading={loading}
            handleClick={handleUnblockCard}
          />
        </Box>
      )}
    </Box>
  );
};
