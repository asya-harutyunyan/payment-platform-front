import { formatCardNumber } from "@/common/utils";
import Button from "@/components/atoms/button";
import { MobileCards } from "@/components/atoms/swiper-slider";
import { BankCardDetalis } from "@/components/molecules/add-card-form";
import BankCard from "@/components/molecules/bankCard";
import Carroussel from "@/components/molecules/carousel-3d";
import { TabsComponent } from "@/components/molecules/tabs";
import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { H2, P } from "@/styles/typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useMemo } from "react";
import { tabNames } from "./__mocks_";

export const BankInfoComponent: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = useMemo(() => {
    const userCards = (user?.bank_details || []).map((card, index) => ({
      key: card.id || index,
      content: (
        <BankCard
          cardHolder={card.card_holder ?? "Name Surname"}
          cardNumber={formatCardNumber(
            card.card_number ?? "1234 5678 1234 5678"
          )}
          bankName={card.bank_name ?? "Bank"}
          isBlocked={card.is_blocked}
          textColor="#FFFFFF"
          bankDetailID={card.id ?? 0}
          currency={(card.currency as string) ?? 0}
          isBankDetailsLengthBigger={
            user?.bank_details.length && user?.bank_details.length >= 3
              ? true
              : false
          }
        />
      ),
    }));

    if (userCards.length > 3) {
      return userCards;
    }

    // Добавляем дефолтные карты, если своих меньше 3
    const defaultCards = Array.from({ length: 3 - userCards.length }).map(
      (_, idx) => ({
        key: userCards.length + idx, // теперь key всегда number
        content: (
          <BankCard
            cardHolder={"Name Surname"}
            cardNumber={formatCardNumber("1234 5678 1234 5678")}
            bankName={"Bank"}
            isBlocked={undefined}
            textColor="#FFFFFF"
            bankDetailID={0}
            currency={""}
            isBankDetailsLengthBigger={
              user?.bank_details.length && user?.bank_details.length >= 3
                ? true
                : false
            }
          />
        ),
      })
    );

    return [...userCards, ...defaultCards];
  }, [user]);

  const tabContent = useMemo(
    () => [
      {
        id: 1,
        component: (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: { lg: "block", md: "block", sx: "none", xs: "none" },
              }}
            >
              <Carroussel
                cards={cards}
                height="500px"
                width="100%"
                margin="0 auto"
                offset={2}
                showArrows={false}
              />
            </Box>
            <Box
              sx={{
                display: { lg: "none", md: "none", sx: "flex", xs: "flex" },
                justifyContent: "center",
                width: "100%",
              }}
            >
              <MobileCards cards={user?.bank_details} />
            </Box>
          </Box>
        ),
      },
      { id: 2, component: <BankCardDetalis /> },
    ],
    [cards, user?.bank_details]
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: {
              lg: "80vh",
              md: "80vh",
              xs: "max-content",
              sm: "max-content",
            },
            justifyContent: {
              lg: "space-between",
              md: "space-between",
              sx: "center",
              xs: "center",
            },
            flexDirection: {
              lg: "row",
              md: "row",
              sx: "column",
              xs: "column",
            },
          }}
        >
          <Box
            sx={{
              width: {
                lg: "45%",
                md: "45%",
                sx: "100%",
                xs: "100%",
              },
            }}
          >
            <H2 color="primary.main">
              <AccountBalanceIcon
                sx={{ paddingRight: "10px", width: "30px", height: "30px" }}
              />
              {t("bank_info")}
            </H2>
            <P fontSize={"20px"} paddingTop={"10px"} paddingLeft={"10px"}>
              {t("name")} :{" "}
              <span
                style={{
                  fontSize: "17px",
                  color: theme.palette.tertiary.contrastText,
                }}
              >
                {user?.name}
              </span>
            </P>
            <P fontSize={"20px"} paddingTop={"10px"} paddingLeft={"10px"}>
              {t("surname")} :{" "}
              <span
                style={{
                  fontSize: "17px",
                  color: theme.palette.tertiary.contrastText,
                }}
              >
                {user?.surname}
              </span>
            </P>
            <P fontSize={"20px"} paddingTop={"10px"} paddingLeft={"10px"}>
              {t("email")} :{" "}
              <span
                style={{
                  fontSize: "17px",
                  color: theme.palette.tertiary.contrastText,
                }}
              >
                {user?.email}
              </span>
            </P>
          </Box>
          <Box
            sx={{
              width: { lg: "50%", md: "50%", sx: "100%", xs: "100%" },
              marginBottom: {
                lg: "200px",
                md: "200px",
                sx: "0",
                xs: "0",
              },
            }}
          >
            <TabsComponent tabPanel={tabContent} tabNames={tabNames} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant={"gradient"}
          sx={{ width: "230px", margin: "20px 0" }}
          text={"Начать Зарабатывать"}
          onClick={() => {
            navigate({ to: "/steps" });
          }}
        />
      </Box>
    </Box>
  );
};
