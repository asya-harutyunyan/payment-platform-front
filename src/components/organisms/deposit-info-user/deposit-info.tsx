import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import TaskHeader from "@/components/molecules/title";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { Paper } from "../../molecules/paper/paper";
import useDepositInfo from "./_services/useDepositInfo";
import { fields } from "./columns";

export const DepositInfoUser: FC = () => {
  const { singleDeposit, loading, router, canGoBack } = useDepositInfo();
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
          title={t("deposit_information")}
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
            title={"deposit_information_single"}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};
