import Icon from "@/components/atoms/icon";
import theme from "@/styles/theme";
import { H2, P } from "@/styles/typography";

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
import { Link } from "@tanstack/react-router";
import { FC, ReactNode, useEffect, useState } from "react";
import { adminItems, userItems } from "./__item_list__";
interface DashboardPageProps {
  children?: ReactNode;
  role?: "admin" | "user";
}

const DashboardPage: FC<DashboardPageProps> = ({
  children,
  role = "admin",
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [sidebarItems, setSidebarItems] = useState(userItems);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const drawerStyles = {
    width: 240,
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

  const renderSidebarItems = () =>
    sidebarItems.map((item, index) => (
      <ListItem key={index} sx={{ width: "100%" }}>
        <Link
          to={item.link}
          onClick={isDrawerOpen ? toggleDrawer : undefined} // Close the drawer on mobile
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
          <List sx={{ height: "100vh" }}>{renderSidebarItems()}</List>
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
          <List>{renderSidebarItems()}</List>
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
