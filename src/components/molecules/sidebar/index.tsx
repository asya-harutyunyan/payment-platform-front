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
import { H2, H3, H6, P } from "@/styles/typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
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

const DashboardPage: FC<DashboardPageProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(userItems);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  // const data = useAuth();


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
  // const downloadApk = async () => {
  //   try {
  //     fetch("/public/app-release.apk", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/pdf",
  //       },
  //     })
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         // Create blob link to download
  //         const url = window.URL.createObjectURL(blob);

  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", `app-release.apk`);

  //         // Append to html link element page
  //         document.body.appendChild(link);

  //         // Start download
  //         link.click();

  //         // Clean up and remove the link
  //         link.parentNode?.removeChild(link);
  //       });
  //   } catch (error) {
  //     console.error("Ошибка при скачивании:", error);
  //   }
  // };

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
    <Box sx={{ background: `linear-gradient(135deg, #0551ac 0%, #041939 100%)` }}>
      {/* mobile header */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MoreVertIcon sx={{ paddingRight: "10px" }} />
            <Logo />
          </IconButton>
          <H3 noWrap> {t("payhub")}</H3>
        </Toolbar>
      </AppBar>

      {/* mobile opening sidebar */}
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

      <Box maxWidth={1200} height="60px" margin="0 auto" display="flex" justifyContent="space-between" alignItems="center" pt="40px" >
        <Box component={Link} to="/" sx={{ width: "189px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", textDecoration: "none" }}>
          <Logo width="44px" height="52px" />
          <H6
            sx={{
              fontSize: "26px",
              p: "0"
            }}
          >
            PayHub
          </H6>
        </Box>
        {user?.role === "client" &&
          <Box
            sx={{
              display: "flex",
              justifyContent: isCollapsed ? "center" : "start",
              alignItems: "center",
              gap: "8px"
            }}
          >

            <Box
              width="60px"
              height="60px"
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
              <H2>
                {user?.name ? user.name.charAt(0).toUpperCase() : ""}
              </H2>
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
                <H6 color={"#A4A6A7"} padding={"0 5px 0 0 "}>
                  {user?.name}{" "} {user?.surname}
                </H6>
              </Box>

            </Box>
          </Box>
        }
      </Box>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "stretch",
          height: "90vh",
          flexGrow: 1,
          padding: {
            ld: "50px",
            md: "50px",
            xs: "20px",
            sm: "20px",
          },
        }}
      >
        {/* desk sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { lg: "flex", md: "flex", xs: "none", sm: "block" },
            justifyContent: isCollapsed ? "center" : "flex-start",
            width: isCollapsed ? 88 : 349,
            height: "70vh",
            "& .MuiDrawer-paper": {
              width: isCollapsed ? 88 : 280,
              padding: isCollapsed ? "10px" : "30px",
              backgroundColor: "transparent",
              overflowX: "hidden",
              transition: "width 0.3s",
              boxSizing: "border-box",
              position: "relative",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              boxShadow: Colors.transparentBoxShadow,
              borderRadius: "40px"
            },
          }}
        >
          <Box sx={{ height: "auto" }}>
            <GeneralInfo setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
            <Sidebar items={sidebarItems} onItemClick={toggleDrawer} isCollapsed={isCollapsed} />
          </Box>

          <Box
            sx={{
              height: "6%",
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <LogoutButton handleLogout={handleLogout} />
            {user?.role === "client" && <DeleteAccountButton />}
          </Box>
        </Drawer>

        {/* content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            zIndex: 2,
            mt: { lg: 0, md: 0, xs: "70px", sm: "70px" },
          }}
        >
          {children}
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
