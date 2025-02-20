import { Logo } from "@/components/atoms/logo";
import { useAuth } from "@/context/auth.context";
import { H2, H6 } from "@/styles/typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction } from "react";

interface IGeneralInfo {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
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

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <Box sx={{ marginRight: "10px" }}>
          <AccountCircleIcon
            sx={{
              width: "75px",
              height: "75px",
              color: "tertiary.contrastText",
            }}
          />
        </Box>
        <H6 align="center" color={"tertiary.contrastText"} paddingRight={"5px"}>
          {data?.user?.surname}{" "}
        </H6>
        <H6 align="center" color={"tertiary.contrastText"} paddingRight={"5px"}>
          {data?.user?.name}
        </H6>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
