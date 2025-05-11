import { Logo } from "@/components/atoms/logo";
import { useAuth } from "@/context/auth.context";
import { H2, H6, P } from "@/styles/typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction } from "react";
interface IGeneralInfo {
  setIsCollapsed?: Dispatch<SetStateAction<boolean>>;
  isCollapsed?: boolean;
}
const GeneralInfo: FC<IGeneralInfo> = ({ setIsCollapsed, isCollapsed }) => {
  const data = useAuth();
  return (
    <Box>
      <Box
        sx={{
          display: { lg: "flex", md: "flex", xs: "none", sm: "none" },
          justifyContent: isCollapsed ? "center" : "space-between",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {!isCollapsed && <Logo />}
          <H2
            sx={{
              paddingLeft: "15px",
              display: isCollapsed ? "none" : "inherit",
            }}
          >
            {t("payhub")}
          </H2>
        </Box>
        <IconButton
          onClick={() => setIsCollapsed?.((prev) => !prev)}
          sx={{ color: "white", display: !isCollapsed ? "flex" : "none" }}
        >
          {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: isCollapsed ? "center" : "start",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Box
          sx={{
            marginRight: isCollapsed ? "0" : "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon
            sx={{
              width: "65px",
              height: "65px",
              color: "tertiary.main",
              // marginLeft: isCollapsed ? "20px" : "0",
            }}
          />
          <IconButton
            onClick={() => setIsCollapsed?.((prev) => !prev)}
            sx={{
              color: "white",
              display: isCollapsed ? "flex" : "none",
            }}
          >
            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          {!isCollapsed && (
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
          )}

          {!isCollapsed && (
            <P
              align="center"
              color={"tertiary.contrastText"}
              fontSize={"0.8rem"}
            >
              {data?.user?.email}
            </P>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
