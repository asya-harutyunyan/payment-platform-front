import AppleIcon from "@/assets/images/apple_icon.svg";
import PhoneImg from "@/assets/images/landing_page_phone.png";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { Colors } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { H1, H6 } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import NewButton from "../../btn";
import TransfersCard from "./transfersCard";
import FxChart from "./valuechart";


export const AboutSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: Colors.gradientBg,
        pt: "40px",
      }}
    >

      <H1
        maxWidth="654px"
        margin="0 auto"
        minHeight="120px"
        textAlign="center"
        style={{
          lineHeight: "1.3",
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
      <Box display="flex" maxWidth="466px" gap="10px" margin="20px auto 20px auto">
        <Box
        >
          <NewButton
            text={"Скачать приложение"}
            onClick={downloadApk}
            icon={AppleIcon}
            variant="outlinedBlue"
            sx={{
              width: "242px",
              height: "46px",
              padding: "13px 16px"
            }}
          />
        </Box>
        <Box
        >
          <NewButton
            text={user ? "Главная" : "Начать Сейчас"}
            variant={"gradient"}
            onClick={onBtnClick}
            glow
            sx={{
              width: "208px",
              height: "46px",
              padding: "13px 16px"
            }}
          />
        </Box>
      </Box>


      <Box maxWidth={1200} margin="0 auto" display="flex" gap="30px">
        {/* 1 */}
        <Box maxWidth={418} display="flex" flexDirection="column" gap="24px" alignItems="flex-end">
          <Box
            sx={{
              position: "relative",
              maxWidth: 356,
              p: "20px 13.5px",
              borderRadius: "16px",
              background:
                "linear-gradient(180deg, rgba(49,58,91,0) 0%, rgba(49,58,91,0.44) 44%, rgba(49,58,91,1) 100%)",
              backdropFilter: "blur(25px)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "16px",
                padding: "1px",
                background:
                  "linear-gradient(360deg, rgba(43,255,255,0.8) 0%, rgba(43,255,255,0.2) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            <H6 sx={{ textAlign: "center" }}>
              Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать должно быть
              легко, безопасно и выгодно.
            </H6>
          </Box>
          <TransfersCard />
        </Box>
        {/* 2 */}
        <Box>
          <img
            src={PhoneImg}
            alt="Phone"
            style={{ width: "346px", borderRadius: "3px" }}
          />
        </Box>
        {/* 3 */}
        <FxChart />
      </Box>

    </Box >
  );
};
