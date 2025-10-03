import AppleIcon from "@/assets/images/apple_icon.svg";
import PhoneImg from "@/assets/images/landing_page_phone.png";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { Colors, greenGradientBorder } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getLayoutStatsThunk } from "@/store/reducers/layoutStats/thunk";
import { H1, H6 } from "@/styles/typography";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import NewButton from "../../btn";
import ResponsiveAppBar from "../header";
import BalanceChart from "./components/balanceChart";
import TransfersCard from "./components/transfersCard";
import ValueChart from "./components/valuechart";
import { Transfers } from "./transfersData";

export const AboutSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDesktop = useMediaQuery("(min-width:600px)");

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((s) => s.layoutStats);

  useEffect(() => {
    dispatch(getLayoutStatsThunk());
  }, [dispatch]);

  const downloadApk = async () => {
    try {
      fetch("/public/app-release.apk", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `app-release.apk`);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        });
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
    }
  };

  const onBtnClick = useCallback(() => {
    let to = "/auth/sign-in";

    switch (user?.role) {
      case EUserRole.Client:
        to = "/my-information";
        break;
      case EUserRole.Admin:
      case EUserRole.SupportLead:
      case EUserRole.SupportOperator:
      case EUserRole.SupportTrainee:
      case EUserRole.TechnicalSpecialist:
        to = "/welcome";
        break;
      case EUserRole.SuperAdmin:
        to = "/deposit-list";
        break;
      default:
        break;
    }
    navigate({
      to: to,
      replace: true,
    });
  }, [navigate, user?.role]);

  const mappedTransfers = Transfers.map((t) => {
    let amount = "—";
    if (data) {
      switch (t.key) {
        case "card_orders_amount":
          amount = `$${data.orders.card_orders_amount}`;
          break;
        case "orders_for_crypto":
          amount = `$${data.orders.orders_for_crypto}`;
          break;
        case "orders_for_fiat":
          amount = `$${data.orders.orders_for_fiat}`;
          break;
      }
    }
    return { ...t, amount };
  });

  return (
    <Box
      id={"why_choose_us"}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: Colors.gradientBg,
      }}
    >
      <ResponsiveAppBar />
      <H1
        maxWidth={{ xs: "400px", sm: "654px" }}
        margin="0 auto"
        minHeight="120px"
        textAlign="center"
        letterSpacing="1.5px"
        sx={{
          lineHeight: "1.3",
          fontSize: { xs: "30px", sm: "40px" },
          pt: "40px",

          fontStyle: "medium",
        }}
      >
        Добро пожаловать в{" "}
        <span
          style={{
            fontStyle: "italic",
            background: Colors.gradientBg,
            color: Colors.white,
            padding: "0 8px",
            borderRadius: "50px",
          }}
        >
          PayHub
        </span>
        - Здесь Деньги Работают на Вас
      </H1>
      <Box
        display="flex"
        width={{ xs: "350px", sm: "466px" }}
        maxWidth="100%"
        gap="10px"
        margin="20px auto"
        px={{ xs: "16px", sm: "0" }}
      >
        <NewButton
          text="Скачать приложение"
          onClick={downloadApk}
          icon={AppleIcon}
          variant="outlinedBlue"
          sx={{
            flex: 1,
            minWidth: "120px",
            height: "46px",
            padding: "13px 16px",
          }}
        />
        <NewButton
          text={user ? "Главная" : "Начать Сейчас"}
          variant="gradient"
          onClick={onBtnClick}
          glow
          sx={{
            minWidth: "120px",
            width: { xs: "160px", sm: "208px" },
            height: "46px",
            padding: "13px 16px",
          }}
        />
      </Box>
      <Box
        maxWidth={1200}
        px={{ xs: "16px", sm: "0" }}
        margin="0 auto"
        display="flex"
        gap={{ xs: "10px", sm: "30px" }}
        flexDirection={{ xs: "column", lg: "row" }}
        alignItems="center"
      >
        {/* 1 */}
        <Box
          maxWidth={"100%"}
          display="flex"
          flexDirection={{ xs: "row", lg: "column" }}
          gap="24px"
          alignItems="flex-end"
          order={{ xs: 2, lg: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              flexBasis: { xs: "100%", sm: "100%" },
              maxWidth: { xs: "none", sm: "none", md: 356 },
              p: "20px 13.5px",
              borderRadius: "16px",
              background: {
                xs: Colors.gradientBg,
                sm: "linear-gradient(180deg, rgba(49,58,91,0) 0%, rgba(49,58,91,0.44) 44%, rgba(49,58,91,1) 100%)",
              },
              backdropFilter: { xs: "blur(0)", sm: "blur(25px)" },
              mt: { xs: "-200px", sm: "0" },
              "&::before": greenGradientBorder,
            }}
          >
            <H6 sx={{ textAlign: "center" }}>
              Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать
              должно быть легко, безопасно и выгодно.
            </H6>
          </Box>
          {isDesktop && <TransfersCard mappedTransfers={mappedTransfers} />}
        </Box>
        <Box order={{ xs: 1, lg: 2 }}>
          <img
            src={PhoneImg}
            alt="Phone"
            style={{ maxWidth: "350px", marginBottom: "-3px" }}
          />
        </Box>
        {isDesktop && (
          <Box
            order={3}
            width="410px"
            display="flex"
            flexDirection="column"
            gap="10px"
            flex="1"
          >
            <ValueChart />
            <BalanceChart balanceData={data?.wallet_deposits} />
          </Box>
        )}

        {!isDesktop && (
          <Box width="100%" display="flex" gap="11px" order={3}>
            <Box display="flex" flexDirection="column" gap="19px">
              {mappedTransfers.map((t) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="140px"
                  p="6px 10px"
                  borderRadius="0.87px"
                  position="relative"
                  sx={{ "&::before": greenGradientBorder }}
                >
                  <Box
                    sx={{
                      width: "41px",
                      height: "41px",
                    }}
                  >
                    <img
                      src={t.icon}
                      alt="Icon"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "16.4px",
                      fontWeight: 700,
                      color: "#3A95FF",
                    }}
                  >
                    {t.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
            <BalanceChart balanceData={data?.wallet_deposits} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
