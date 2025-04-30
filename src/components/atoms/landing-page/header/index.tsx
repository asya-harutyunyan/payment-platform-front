import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useCallback, useState } from "react";
import Button from "../../button";
import { Logo } from "../../logo";
const pages = ["why_choose_us", "about_earn_money", "about_us", "contact"];

export const ResponsiveAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderGeneralInfo = () => {
    return pages.map((item, index) => (
      <ListItem key={index} sx={{ width: "100%", padding: "0 0 0 10px" }}>
        <Box
          onClick={() => handleScroll(item)}
          style={{ textDecoration: "none", width: "100%", padding: "0" }}
        >
          <ListItemButton sx={{ width: "100%", padding: "20px 0" }}>
            <P sx={drawerItemStyles}>{t(item)}</P>
          </ListItemButton>
        </Box>
      </ListItem>
    ));
  };

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

  const { user } = useAuth();

  const onBtnClick = useCallback(() => {
    let to = "/auth/sign-in";
    switch (user?.role) {
      case "client":
        to = "/my-information";
        break;
      case "admin":
        to = "/deposit-list";
        break;
      case "superAdmin":
        console.log(user?.role);

        to = "/deposit-list";
        break;
      default:
        break;
    }
    navigate({
      to: to,
      replace: true,
    });
  }, [navigate, user?.role]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            onClick={toggleDrawer}
            sx={{
              width: { lg: "20%", md: "20%", xs: "60%", sm: "60%" },
              display: "flex",
              alignItems: "center",
              justifyContent: {
                lg: "center",
                md: "center",
                xs: "space-between",
                sm: "space-between",
              },
            }}
          >
            <MenuIcon
              sx={{
                display: { lg: "none", md: "none", xs: "block", sm: "block" },
              }}
            />
            <Logo />

            <H3
              sx={{
                fontSize: {
                  lg: "inherit",
                  md: "inherit",
                  xs: "20px",
                  sm: "20px",
                },
              }}
            >
              PayHub
            </H3>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { lg: "flex", md: "flex", xs: "none", sm: "none" },
              justifyContent: "space-evenly",
              width: "50%",
            }}
          >
            {pages.map((page) => (
              <Box
                key={page}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={() => handleScroll(page)}
              >
                <P color="primary.contrastText">{t(page)}</P>
              </Box>
            ))}
          </Box>
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
              ></Box>
            </Box>
          </Drawer>

          <Box
            sx={{
              flexGrow: 0,
              width: { lg: "30%", md: "30%", xs: "40%", sm: "40%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              text={t(user ? "Главная" : "sign_in")}
              variant={"gradient"}
              onClick={onBtnClick}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
