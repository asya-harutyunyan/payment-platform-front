import ArrowLeftIcon from "@/assets/images/deposit_left_arrow.svg";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { H4 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { Paper } from "../../molecules/paper/paper";
import useDepositInfo from "./_services/useDepositInfo";
import { fields } from "./columns";

export const DepositInfoUser: FC = () => {
  const { singleDeposit, loading, router, canGoBack } = useDepositInfo();
  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        width: "95%",
        borderRadius: "16px",
        ml: { xs: "0", lg: "20px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          p: "20px",
          borderBottom: "1px solid #6cadfc",
        }}
      >
        {" "}
        {canGoBack && (
          <Box
            onClick={() => router.history.back()}
            width={42}
            height={42}
            sx={{ cursor: "pointer" }}
          >
            <img src={ArrowLeftIcon} alt="Back" />
          </Box>
        )}
        <H4
          fontWeight={600}
          fontSize={{ xs: "18px", sm: "24px" }}
          p="0"
          color="#000"
        >
          {t("deposit_information")}
        </H4>
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
