import { BankCardDetalis } from "@/components/molecules/add-card-form";
import BankCard from "@/components/molecules/bankCard";
import Carroussel from "@/components/molecules/carousel";
import { TabsComponent } from "@/components/molecules/tabs";
import TaskHeader from "@/components/molecules/title";
import theme from "@/styles/theme";
import { H2, P } from "@/styles/typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box } from "@mui/material";
import { FC } from "react";
const cards = [
  {
    key: Math.random(),
    title: "s",
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
    title: "swewe",
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
    title: "swewe",
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
//needed
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
        <Carroussel
          cards={cards}
          height="500px"
          width="100%"
          margin="0 auto"
          offset={2}
          showArrows={false}
        />
      </Box>
    ),
  },
  { id: 2, component: <BankCardDetalis /> },
];
const tabNames = [
  { id: 1, name: "Bank Information" },
  { id: 2, name: "Add Bank Card" },
];
export const BankInfoComponent: FC = () => {
  return (
    <Box>
      <TaskHeader title={"Order List"} subTitle={"Lorem ipsum"} />
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* <TabsComponent tabPanel={tabContent} tabNames={tabNames} /> */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "45%" }}>
            <H2 color="primary.main">
              <AccountBalanceIcon
                sx={{ paddingRight: "10px", width: "30px", height: "30px" }}
              />
              Bank Information
            </H2>
            <P fontSize={"20px"} paddingTop={"10px"} paddingLeft={"10px"}>
              NAME :{" "}
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
              SURNAME :{" "}
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
              EMAIL :{" "}
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </P>
          </Box>
          <Box sx={{ width: "50%" }}>
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
