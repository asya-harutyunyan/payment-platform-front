import { Logo } from "@/components/atoms/logo";
import { useAuth } from "@/context/auth.context";
import { H2, H6, P } from "@/styles/typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

const GeneralInfo: FC = () => {
  const data = useAuth();
  return (
    <Box>
      <Box
        sx={{
          display: { lg: "flex", md: "flex", xs: "none", sm: "none" },
          justifyContent: "start",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <Logo />
        <H2 sx={{ paddingLeft: "15px" }}>{t("payhub")}</H2>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginRight: "10px" }}>
          <AccountCircleIcon
            sx={{
              width: "65px",
              height: "65px",
              color: "tertiary.main",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <H6 color={"tertiary.main"} padding={"0 5px 0 0 "}>
              {data?.user?.surname}{" "}
            </H6>
            <H6 color={"tertiary.main"} padding={"0 5px 0 0 "}>
              {data?.user?.name}
            </H6>
          </Box>
          <P align="center" color={"tertiary.contrastText"} fontSize={"0.8rem"}>
            {data?.user?.email}
          </P>
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
