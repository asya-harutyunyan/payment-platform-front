import theme from "@/styles/theme";
import { H2, H3, H6, P } from "@/styles/typography";

import Button from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";
import { useAuth } from "@/context/auth.context";
import { logoutUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useState } from "react";
import { adminItems, userItems } from "./__item_list__";
interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPage: FC<DashboardPageProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(userItems);
  const data = useAuth();
  // const changeLanguage = (lang: string | undefined) => {
  //   i18n.changeLanguage(lang);
  // };
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const drawerStyles = {
    paddingTop: "70px",
    width: 240,
    height: "100vh",
    boxSizing: "border-box",
    backgroundColor: theme.palette.primary.main,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
      backgroundColor: theme.palette.primary.main,
    },
  };

  const drawerItemStyles = {
    color: theme.palette.secondary.contrastText,
  };
  useEffect(() => {
    setSidebarItems(user?.role === "admin" ? adminItems : userItems);
  }, [user?.role]);

  const handleLogout = async () => {
    const resultAction = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(resultAction)) {
      navigate({ to: "/" });
    } else {
      console.error("Logout failed:", resultAction.payload);
    }
  };
  const renderSidebarItems = () =>
    sidebarItems.map((item, index) => (
      <ListItem key={index} sx={{ width: "100%", padding: "0 0 0 10px" }}>
        <Link
          to={item.link}
          onClick={isDrawerOpen ? toggleDrawer : undefined}
          style={{ textDecoration: "none", width: "100%", padding: "0" }}
        >
          <ListItemButton sx={{ width: "100%", padding: "20px 0" }}>
            <ListItemIcon sx={drawerItemStyles}>{item.icon}</ListItemIcon>
            <P sx={drawerItemStyles}> {t(item.text)}</P>
          </ListItemButton>
        </Link>
      </ListItem>
    ));
  const renderGeneralInfo = () => {
    return (
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Logo />
          <H2
            sx={{
              display: {
                lg: "inline",
                md: "inline",
                sx: "none",
                xs: "none",
              },
              paddingLeft: "15px",
            }}
          >
            {t("payhub")}
          </H2>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Box>
            <AccountCircleIcon
              sx={{
                width: "75px",
                height: "75px",
                color: theme.palette.tertiary.contrastText,
              }}
            />
          </Box>
          <H6
            align="center"
            color={theme.palette.tertiary.contrastText}
            paddingLeft={"10px"}
          >
            {data?.user?.surname}
          </H6>
          <H6
            align="center"
            paddingLeft={"10px"}
            color={theme.palette.tertiary.contrastText}
          >
            {data?.user?.name}
          </H6>
        </Box>

        <List>{renderSidebarItems()}</List>
      </Box>
    );
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
            <Logo />
          </IconButton>
          <H3 noWrap> {t("payhub")}</H3>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "22%",
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: "22%",
            padding: "30px",
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {renderGeneralInfo()}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleLogout}
            sx={{
              width: "70%",
              textAlign: "center",
              position: "absolute",
              bottom: "50px",
              cursor: "pointer",
            }}
            icon={LogoutIcon}
            text={t("log_out")}
            variant={"text"}
          />
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
            width: 240,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Box sx={drawerStyles}>
          <List>{renderGeneralInfo()}</List>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleLogout}
              sx={{
                width: "70%",
                textAlign: "center",
                position: "absolute",
                bottom: "50px",
                cursor: "pointer",
              }}
              icon={LogoutIcon}
              text={t("log_out")}
              variant={"text"}
            />
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          width: "78%",
          flexGrow: 1,
          padding: "50px",
          mt: { xs: "64px", sm: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPage;
