import PlusIcon from "@/assets/images/plus_icon.svg";
import { formatCardNumber } from "@/common/utils";
import NewButton from "@/components/atoms/btn";
import { MobileCards } from "@/components/atoms/swiper-slider";
import BankCard from "@/components/molecules/bankCard";
import Carroussel from "@/components/molecules/carousel-3d";
import { greenGradientBorder } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { H1, H5, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { FC, useMemo, useState } from "react";
import { AddCardModal } from "../add_card_modal";
import CardTable from "./components/cardsTable";

export const BankInfoComponent: FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const cards = useMemo(() => {
    const userCards = (user?.bank_details || []).map((card, index) => ({
      key: card.id || index,
      content: (
        <BankCard
          cardHolder={card.card_holder}
          cardNumber={formatCardNumber(card.card_number)}
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
    return [...userCards];
  }, [user]);

  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {cards.length >= 3 ? (
            <H5
              fontStyle="italic"
              fontWeight={400}
              maxWidth={650}
              textAlign="center"
            >
              Вы добавили все доступные карты. Для добавления новой удалите одну
              из существующих.
            </H5>
          ) : (
            <Box maxWidth={569} m="0 auto">
              <H1
                color="white"
                mb={{ xs: "16px", sm: "24px" }}
                fontSize={{ xs: "24px", sm: "40px" }}
                textAlign="center"
              >
                Добро пожаловать в{" "}
                <span style={{ fontStyle: "italic" }}>PayHub</span>
              </H1>
              <P
                textAlign="center"
                fontSize={{ xs: "14px", sm: "16px" }}
                color="white"
                mb="25px"
              >
                Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать
                можно легко, безопасно и выгодно.
              </P>
            </Box>
          )}

          {/* Cards */}
          {cards.length <= 0 ? (
            <Box
              sx={{
                width: {
                  xs: "80%",
                  lg: "437px",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "40px 20px",
                position: "relative",
                mx: "auto",
                borderRadius: "14px",
                background: `linear-gradient(135deg, #1e508e 0%, #1e508e 40%, #368593 100%)`,
                "&::before": greenGradientBorder,
              }}
            >
              <H6
                width={{ xs: "100%", sm: 256 }}
                textAlign="center"
                fontSize={{ xs: "13px", sm: "16px" }}
              >
                Добавьте карту, на которую хотите получать деньги
              </H6>
              <NewButton
                variant={"gradient"}
                sx={{ width: { xs: "100%", sm: "256px" } }}
                text={"Добавить карту"}
                icon={PlusIcon}
                onClick={() => setOpen(true)}
              />
            </Box>
          ) : (
            <>
              {cards.length < 3 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  maxWidth={{ xs: "100%", lg: "50%" }}
                  gap="10px"
                  margin="10px auto"
                >
                  <Box flex={1}>
                    <NewButton
                      text="Начать Сейчас"
                      variant="outlinedBlue"
                      onClick={() => {
                        navigate({ to: "/steps" });
                      }}
                      sx={{
                        width: "100%",
                        height: "46px",
                        padding: "13px 16px",
                      }}
                    />
                  </Box>
                  <Box flex={1}>
                    <NewButton
                      variant={"gradient"}
                      sx={{
                        width: "100%",
                        height: "46px",
                      }}
                      text={"Добавить карту"}
                      icon={PlusIcon}
                      onClick={() => setOpen(true)}
                    />
                  </Box>
                </Box>
              )}

              <Box
                mt={{ xs: "22px", sm: "50px" }}
                sx={{
                  width: { xs: "100%", md: "60%" },
                }}
              >
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
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <Carroussel
                      cards={cards}
                      height="204px"
                      width="100%"
                      margin="0 auto"
                      offset={2}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: {
                        lg: "none",
                        md: "none",
                        sx: "flex",
                        xs: "flex",
                      },
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <MobileCards cards={user?.bank_details} />
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <CardTable cards={user?.bank_details} />
      </Box>
      <AddCardModal open={open} setOpen={setOpen} />
    </>
  );
};
