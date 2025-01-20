import { BankCardDetalis } from "@/components/molecules/add-card-form";
import BankCard from "@/components/molecules/bankCard";
import Carroussel from "@/components/molecules/carousel-3d";
import { TabsComponent } from "@/components/molecules/tabs";
import TaskHeader from "@/components/molecules/title";
import theme from "@/styles/theme";
import { H2, P } from "@/styles/typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
const cards = [
  {
    key: Math.random(),
    content: (
      <BankCard
        cardHolder="Jane Smith"
        cardNumber="9876 5432 1098 7654"
        expiryDate="11/26"
        bankName="MUI Bank"
        bgColor="#4CAF50"
        textColor="#FFFFFF"
      />
    ),
  },
  {
    key: Math.random(),
    content: (
      <BankCard
        cardHolder="Jane Smith"
        cardNumber="9876 5432 1098 7654"
        expiryDate="11/26"
        bankName="MUI Bank"
        bgColor="#4CAF50"
        textColor="#FFFFFF"
      />
    ),
  },
  {
    key: Math.random(),
    content: (
      <BankCard
        cardHolder="Jane Smith"
        cardNumber="9876 5432 1098 7654"
        expiryDate="11/26"
        bankName="MUI Bank"
        bgColor="#4CAF50"
        textColor="#FFFFFF"
      />
    ),
  },
];
const tabContent = [
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
        <Box>{/* <SimpleSlider slider={cards}></SimpleSlider> */}</Box>
      </Box>
    ),
  },
  { id: 2, component: <BankCardDetalis /> },
];
const tabNames = [
  { id: 1, name: "bank_info" },
  { id: 2, name: "add_bank_card" },
];
export const BankInfoComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={t("order_list")} subTitle={"Lorem ipsum"} />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
                {" "}
                John
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
                {" "}
                Smith
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
                JohnSmith@user.com
              </span>
            </P>
            <P
              paddingTop={"30px"}
              fontSize={"18px"}
              color="tertiary.contrastText"
            >
              {t("about_me")}
            </P>
          </Box>
          <Box
            sx={{
              width: { lg: "50%", md: "50%", sx: "100%", xs: "100%" },
            }}
          >
            <TabsComponent tabPanel={tabContent} tabNames={tabNames} />
          </Box>
          {/* <Carroussel
            cards={cards}
            height="500px"
            width="40%"
            margin="0 auto"
            offset={2}
            showArrows={false}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};
