import Icon from "@/components/atoms/icon";
import theme from "@/styles/theme";
import { H2, P } from "@/styles/typography";

import { useAuth } from "@/context/auth.context";
import { logoutUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
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
  Typography,
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
      <ListItem key={index} sx={{ width: "100%" }}>
        <Link
          to={item.link}
          onClick={isDrawerOpen ? toggleDrawer : undefined}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <ListItemButton sx={{ width: "100%" }}>
            <ListItemIcon sx={drawerItemStyles}>{item.icon}</ListItemIcon>
            <P sx={drawerItemStyles}> {t(item.text)}</P>
          </ListItemButton>
        </Link>
      </ListItem>
    ));
  const renderGeneralInfo = () => {
    return (
      <Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <H2
            align="center"
            padding={"30px 30px 30px 0"}
            sx={{
              display: { lg: "inline", md: "inline", sx: "none", xs: "none" },
            }}
          >
            <Icon name="Home" /> Payment
          </H2>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon
            sx={{
              width: "90px",
              height: "90px",
              color: theme.palette.tertiary.contrastText,
            }}
          />
        </Box>
        <P
          sx={{ textDecoration: "underline" }}
          align="center"
          color={theme.palette.tertiary.contrastText}
        >
          Surename
        </P>
        <P
          sx={{ textDecoration: "underline" }}
          align="center"
          paddingBottom={"20px"}
          color={theme.palette.tertiary.contrastText}
        >
          Name
        </P>
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Payment
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
          width: 240,
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {renderGeneralInfo()}
        <P
          color={theme.palette.secondary.contrastText}
          onClick={handleLogout}
          sx={{
            width: "100%",
            textAlign: "center",
            textDecoration: "underline",
            position: "absolute",
            bottom: "50px",
            cursor: "pointer",
          }}
        >
          {t("log_out")}
        </P>
        {/* <button onClick={() => changeLanguage("en")}>English</button> */}
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
          <P
            color={theme.palette.secondary.contrastText}
            onClick={handleLogout}
            sx={{
              width: "100%",
              textAlign: "center",
              textDecoration: "underline",
              position: "absolute",
              bottom: "50px",
              cursor: "pointer",
            }}
          >
            {t("log_out")}
          </P>
          {/* <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("es")}>Español</button>{" "} */}
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: "64px", sm: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPage;
