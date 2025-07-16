import bg from "@/assets/images/modal.png";
// import { AndroidIcon } from "@/assets/svg/android";
// import { IOSIcon } from "@/assets/svg/ios";
import JivoChat from "@/common/jivosite";
import Button from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";
import { BasicModal } from "@/components/atoms/modal";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/reducers/authSlice/thunks";
import theme from "@/styles/theme";
import { H3, H6 } from "@/styles/typography";
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
import { useNavigate } from "@tanstack/react-router";
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

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredAdminItems = useMemo(() => {
    return adminItems
      .map((item) => {
        // if (item.subItems) {
        //   const filteredSubItems = item.subItems.filter(
        //     (subItem: { permission: string }) =>
        //       user?.permissions.includes(subItem.permission)
        //   );

        //   if (
        //     user?.permissions.includes(item.permission) ||
        //     filteredSubItems.length > 0
        //   ) {
        //     return {
        //       text: item.text,
        //       icon: item.icon,
        //       link: user?.permissions.includes(item.permission)
        //         ? item.link
        //         : "#",
        //       subItems: filteredSubItems.map(({ text, link }) => ({
        //         text,
        //         link,
        //       })),
        //     };
        //   }

        //   return null;
        // }

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
      case "superAdmin":
        setSidebarItems(superAdminItems);
        break;
      case "admin":
        setSidebarItems(adminItems);
        // setSidebarItems(filteredAdminItems);
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
      setUser(undefined);
      navigate({ to: "/auth/sign-in" });
    } else {
      console.error("Logout failed:", resultAction.payload);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
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
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { lg: "flex", md: "flex", xs: "none", sm: "block" },
          justifyContent: isCollapsed ? "center" : "start",
          width: isCollapsed ? "7%" : "25%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? "7%" : "25%",
            padding: isCollapsed ? "10px" : "30px",
            backgroundColor: theme.palette.primary.main,
            overflowX: "hidden",
            transition: "width 0.3s",
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ height: "auto" }}>
          <GeneralInfo
            setIsCollapsed={setIsCollapsed}
            isCollapsed={isCollapsed}
          />
          <Sidebar
            items={sidebarItems}
            onItemClick={toggleDrawer}
            isCollapsed={isCollapsed}
          />
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
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          width: isCollapsed ? "88%" : "68%",
          transform: isCollapsed ? "scaleX(0.99)" : "scaleX(1)",
          transformOrigin: "left center",
          transition: "transform 0.3s ease",
          // height: "88vh",
          flexGrow: 1,
          padding: {
            ld: "50px",
            md: "50px",
            xs: "20px",
            sm: "20px",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "90%",
            zIndex: 2,
            marginTop: { lg: "0", md: "0", xs: "70px", sm: "70px" },
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            sx={{ display: "flex", width: "max-content", alignItems: "center" }}
          >
            {/* <P sx={{ paddingRight: "10px", fontWeight: "bold" }}>
              Скачать приложение
            </P>
            <Box sx={{ paddingRight: "5px", cursor: "pointer" }}>
              <IOSIcon />
            </Box>
            <Box sx={{ cursor: "pointer" }} onClick={() => downloadAPK()}>
              <AndroidIcon />
            </Box> */}
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
    </Box>
  );
};

export default DashboardPage;
