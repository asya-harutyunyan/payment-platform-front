import ButtonIcon from "@/assets/images/how_it_works_button.svg";
import Cards from "@/assets/images/how_it_works_cards.png";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { Colors } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { H1, H2, H4, H6 } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import NewButton from "../../btn";
import { HowItWorksData } from "./data";


export const HowItWorks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onBtnClick = useCallback((action: string) => {
    let to = "/auth/sign-in";

    if (user?.role === EUserRole.Client) {
      switch (action) {
        case "deposit":
          to = "/wallet";
          break;
        case "orders":
          to = "/orders";
          break;
        case "profit":
          to = "/deposit-info";
          break;
        default:
          break;
      }
    } else if (
      user?.role === EUserRole.Admin ||
      user?.role === EUserRole.SupportLead ||
      user?.role === EUserRole.SupportOperator ||
      user?.role === EUserRole.SupportTrainee ||
      user?.role === EUserRole.TechnicalSpecialist ||
      user?.role === EUserRole.SuperAdmin
    ) {
      switch (action) {
        case "deposit":
          to = "/deposit-list";
          break;
        case "orders":
          to = "/order-list";
          break;
        case "profit":
          to = "/reports-processed-amount";
          break;
        default:
          break;
      }
    }

    navigate({ to, replace: true });
  }, [navigate, user?.role]);


  return (
    <Box maxWidth="1200px" margin="0 auto" id="header_how_it_works" px={{ xs: "16px", lg: "0" }}
    >
      <Box
        display="flex"
        gap={{ xs: "16px", sm: "33px" }}
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}

      >
        <Box maxWidth={{ xs: "100%", sm: "384px", }} width="100%" textAlign={{ xs: "center", md: "left" }} mx={{ xs: "16px", lg: "0" }}>
          <H1 sx={{ color: "#000000", fontWeight: 600, fontSize: { xs: "24px", sm: "40px" }, }}>
            Как это работает?
          </H1>
          <H6 sx={{ color: "#393939" }}>
            Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать можно
            легко, безопасно и выгодно.
          </H6>
        </Box>

        <Box
          maxWidth={{ xs: "95%", md: "783px" }}
          width="100%"
          borderRadius="10.96px"
          position="relative"
          p={{ xs: "30px 15px 20px 15px", md: "40px 25px 20px 27px" }}
          sx={{
            background: Colors.gradientBg,
          }}
        >
          <H2 sx={{ pb: "12px" }} textAlign={{ xs: "center", md: "left" }}>Создайте аккаунт</H2>
          <hr
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#3aceac",
              border: "none",
              margin: 0,
            }}
          />
          <Box
            maxWidth={{ xs: "100%", sm: "660px" }}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <H6 maxWidth={{ xs: "100%", sm: "500px" }} pt="24px" textAlign={{ xs: "center", md: "left" }}>
              Зарегистрируйтесь за несколько кликов - всё, что вам нужно, это адрес
              электронной почты и надёжный пароль. Никаких длинных форм и сложной
              верификации - быстро, просто и без лишних шагов. Начните за считанные
              секунды!
            </H6>
            <Box mt={{ xs: 2, sm: 0 }}>
              <img
                src={ButtonIcon}
                alt="ButtonIcon"
                style={{ width: "49px", height: "46px" }}
              />
            </Box>
          </Box>

          <Box position="absolute" top="0" right="0" zIndex="1" maxWidth={{ xs: "100px", md: "230px" }}>
            <img src={Cards} alt="Cards" style={{ maxWidth: "100%", width: "100%" }} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="16px" mt="16px" flexWrap="wrap" justifyContent="center">
        {HowItWorksData.map((feature) => (
          <Box
            key={feature.id}
            width="297px"
            bgcolor="#F5F5F5"
            borderRadius="10.96px"
            p="16px 23px 21px 23px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={feature.icon} alt="Icon" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </Box>
            <H4 color="#000000" p="16px 0"
            >
              {feature.title}
            </H4>
            <H6 color="#393939" fontSize="14px" p="0" maxWidth="293px">
              {feature.description}
            </H6>
            <Box
              mt="auto"
            >
              <NewButton
                text={feature.btnText}
                variant={"gradient"}
                onClick={() => onBtnClick(feature.btnAction)}
                sx={{
                  width: "208px",
                  height: "46px",
                  padding: "13px 16px",
                  mt: "10px"
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


