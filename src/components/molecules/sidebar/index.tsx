import Icon from "@/components/atoms/icon";
import theme from "@/styles/theme";
import { H2, H4, P } from "@/styles/typography";

import { logoutUser } from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
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
import { FC, ReactNode, useEffect, useState } from "react";
import { adminItems, userItems } from "./__item_list__";
interface DashboardPageProps {
  children?: ReactNode;
  role?: "admin" | "user";
}

const DashboardPage: FC<DashboardPageProps> = ({ children, role = "user" }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(userItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const drawerStyles = {
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
    setSidebarItems(role === "admin" ? adminItems : userItems);
  }, [role]);

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
            <P sx={drawerItemStyles}> {item.text}</P>
          </ListItemButton>
        </Link>
      </ListItem>
    ));
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
            Dashboard
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
        <Box>
          <H2 align="center" padding={"30px 30px 30px 0"}>
            <Icon name="Home" /> Payment
          </H2>
          <P sx={{ textDecoration: "underline" }} align="center">
            Surename
          </P>
          <P
            sx={{ textDecoration: "underline" }}
            align="center"
            paddingBottom={"20px"}
          >
            Name
          </P>
          <List>{renderSidebarItems()}</List>
        </Box>
        <P
          color={theme.palette.secondary.contrastText}
          onClick={handleLogout}
          sx={{
            width: "100%",
            textAlign: "center",
            textDecoration: "underline",
            position: "absolute",
            bottom: "50px",
          }}
        >
          Log aut
        </P>
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
          <List>{renderSidebarItems()}</List>
          <H4 color="white">Log out</H4>
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
