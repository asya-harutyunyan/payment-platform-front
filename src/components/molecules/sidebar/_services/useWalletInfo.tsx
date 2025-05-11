import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";

const useWalletInfo = () => {
  const { wallet } = useAuth();

  const walletInfo = () => {
    return (
      <>
        <Box sx={{ display: "flex", padding: "25px 10px 10px 10px" }}>
          <P
            sx={{
              color: theme.palette.secondary.contrastText,
              paddingRight: "10px",
            }}
          >
            {t("earnings_amount")}:
          </P>
          <P
            sx={{
              color: "white",
            }}
          >
            {wallet?.processing_amount ?? "0"} ₽
          </P>
        </Box>
        <Box sx={{ display: "flex", padding: "10px" }}>
          <P
            sx={{
              color: theme.palette.secondary.contrastText,
              paddingRight: "10px",
            }}
          >
            {t("expected_profit")}:
          </P>
          <P
            sx={{
              color: "white",
            }}
          >
            {wallet?.profits ?? "0"} ₽
          </P>
        </Box>
      </>
    );
  };

  return { walletInfo };
};

export default useWalletInfo;
