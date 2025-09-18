import bg from "@/assets/images/modal.png";
import telegram from "@/assets/images/telegram-icon-6896828_1280.webp";
import JivoChat from "@/common/jivosite";
import Button from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";
import { BasicModal } from "@/components/atoms/modal";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { Colors } from "@/constants";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/reducers/authSlice/thunks";
import theme from "@/styles/theme";
import { H3, H6, P } from "@/styles/typography";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import {
  // AppBar,
  Box,
  Drawer,
  // IconButton,
  // Toolbar,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { adminItems, superAdminItems, userItems } from "./__item_list__";
import DeleteAccountButton from "./delete_account_button";
import drawerStyles from "./drawer_styles";
import GeneralInfo from "./GeneralInfo";
import LogoutButton from "./logout_button";
import Sidebar from "./sidebar_general";

interface DashboardPageProps {
  children?: ReactNode;
}

const HEADER_H = 60; 

const DashboardPage: FC<DashboardPageProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(userItems);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredAdminItems = useMemo(() => {
    return adminItems
      .map((item) => {
        return item.permission &&
          user?.permissions
            ?.filter((perm): perm is string => !!perm)
            .includes(item.permission)
          ? {
            text: item.text,
            icon: item.icon,
            link: item.link,
          }
          : null;
      })
      .filter((item) => item !== null);
  }, [user?.permissions]);

  useEffect(() => {
    switch (user?.role) {
      case EUserRole.SuperAdmin:
        setSidebarItems(superAdminItems);
        break;
      case EUserRole.Admin:
      case EUserRole.SupportLead:
      case EUserRole.SupportOperator:
      case EUserRole.SupportTrainee:
      case EUserRole.TechnicalSpecialist:
        setSidebarItems(filteredAdminItems);
        break;
      default:
        setSidebarItems(userItems);
        break;
    }
  }, [user?.role, user?.permissions, filteredAdminItems]);

  const toggleDrawer = () => {
    if (!matches) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleLogout = async () => {
    const resultAction = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(resultAction)) {
      logout?.();
      navigate({ to: "/auth/sign-in" });
    } else {
      console.error("Logout failed:", resultAction.payload);
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, #0551ac 0%, #041939 100%)`,
        height: "100vh",
        overflow: "hidden", // page itself does not scroll
      }}
    >
      {/* mobile header (unchanged) */}
      {/* <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2, width: "44px", height: "52px" }}
          >
            <MoreVertIcon sx={{ paddingRight: "10px" }} />
            <Logo />
          </IconButton>
          <H3 noWrap> {t("payhub")}</H3>
        </Toolbar>
      </AppBar> */}

      {/* mobile opening sidebar (unchanged) */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Box sx={drawerStyles}>
          <Box>
            <GeneralInfo />
            <Sidebar items={sidebarItems} onItemClick={toggleDrawer} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <LogoutButton handleLogout={handleLogout} />
            {user?.role === "client" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <a
                  href="https://t.me/payhubofficial"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  target="_blanck"
                >
                  <img
                    src={telegram}
                    alt="telegram"
                    style={{ width: "30px", cursor: "pointer" }}
                  />
                  <P
                    sx={{
                      paddingLeft: "10px",
                      color: "#fff",
                      hover: {
                        color: "#896e6e",
                      },
                    }}
                  >
                    {" "}
                    Связь с нами
                  </P>
                </a>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* FIXED red header for desktop/tablet */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_H}px`,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Box
          // maxWidth=
          width="90%"
          height="100%"
          margin="0 auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={{ xs: 2, sm: 2, md: 0 }}
          py={1.5}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              width: "189px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              textDecoration: "none",
            }}
          >
            <Logo width="44px" height="52px" />
            <H6 sx={{ fontSize: "26px", p: 0 }}>PayHub</H6>
          </Box>

          {user?.role === "client" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: isCollapsed ? "center" : "start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box
                width="40px"
                height="40px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                sx={{
                  backgroundColor: "#101f5e",
                  boxShadow: [
                    "inset 0px 0.33px 13.09px 0px rgba(14,78,114,0.30)",
                    "inset 0px 1.31px 5.89px 0px rgba(107, 173, 252, 1)",
                    "inset 0px 32.07px 32.73px -15.71px rgba(107, 173, 252, 1)",
                    "inset 0px -26.84px 22.26px -20.95px rgba(14,78,114,0.30)",
                    "inset 0px 2.29px 3.60px -1.31px rgba(255,255,255,1)",
                    "inset 0px 12.76px 18.33px -11.78px rgba(107, 173, 252, 1)",
                  ].join(","),
                }}
              >
                <H3 >{user?.name ? user.name.charAt(0).toUpperCase() : ""}</H3>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  justifyContent: "center",
                  mb: "5px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <H6 color={"#A4A6A7"} padding={"0 5px 0 0 "}>
                    {user?.name} {user?.surname}
                  </H6>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* spacer under fixed header for desktop/tablet */}
      <Box sx={{ height: HEADER_H + 32 }} />

      {/* Main row: sticky sidebar + scrollable content under header */}
      <Box
        component="main"
        width="90%"
        // maxWidth={1200}
        m="0 auto"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          height: "100vh",

        }}
      >
        {/* desktop sticky sidebar */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            flex: `0 0 ${isCollapsed ? 88 : 280}px`,
            width: `${isCollapsed ? 88 : 280}px`,
            position: "sticky",
            // top: `${HEADER_H + 16}px`,
            alignSelf: "flex-start",
            height: "82vh",
            overflowY: "auto",
            padding: isCollapsed ? "20px 10px" : "20px",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            boxShadow: Colors.transparentBoxShadow,
            borderRadius: "40px",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ height: "auto" }}>
            <GeneralInfo setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
            <Sidebar items={sidebarItems} onItemClick={toggleDrawer} isCollapsed={isCollapsed} />
          </Box>

          <hr
            style={{
              width: "100%",
              border: "1px solid #0e6c9b",
              margin: "15px 0",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <LogoutButton handleLogout={handleLogout} isCollapsed={isCollapsed} />
            {user?.role === "client" && <DeleteAccountButton isCollapsed={isCollapsed} />}
          </Box>
        </Box>

        {/* scrollable  content area */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: {
              xs: `calc(100vh - 100px)`,
              sm: `calc(100vh - ${HEADER_H}px)`,
            },
            overflow: "auto",
            zIndex: 2,
            mt: { lg: 0, md: 0, xs: 0, sm: 0 },
            backgroundColor: "transparent",
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              minHeight: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#093169",
            color: "tertiary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setOpen(true)}
        >
          <NotificationsActiveIcon />
        </Box>
        <H3 align="center" padding={"10px 0"}>
          {t("confirm_amount")}
        </H3>
        <H3 padding={"10px 0"}>
          <span style={{ textDecoration: "underline" }}>2 384 934</span>{" "}
          {t("received")}
        </H3>
        <Button
          variant={"gradient"}
          text={t("confirm")}
          sx={{ margin: "20px 0" }}
        />
        <H6 sx={{ textDecoration: "underline", color: "tertiary.main" }}>
          {t("countdown")}
        </H6>
      </BasicModal>
      {user?.role !== "superAdmin" && <JivoChat />}
    </Box >
  );
};

export default DashboardPage;
