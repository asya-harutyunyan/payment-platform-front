import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useCallback, useState } from "react";
import NewButton from "../../btn";
import { Logo } from "../../logo";

export const ResponsiveAppBar = () => {
  const pages = ["header_why_choose_us", "header_how_it_works", "contact", "header_our_contacts"];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderGeneralInfo = () => {
    return pages.map((item, index) => (
      <ListItem key={index} sx={{ width: "100%", padding: "0 0 0 10px", cursor: "pointer" }} >
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


  const onBtnClick = useCallback(() => {
    let to = "/auth/sign-in";

    switch (user?.role) {
      case EUserRole.Client:
        to = "/my-information";
        break;
      case EUserRole.Admin:
      case EUserRole.SupportLead:
      case EUserRole.SupportOperator:
      case EUserRole.SupportTrainee:
      case EUserRole.TechnicalSpecialist:
        to = "/welcome";
        break;
      case EUserRole.SuperAdmin:
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
    <Box width="100%" bgcolor="#191d2f" >
      <AppBar position="static" sx={{
        maxWidth: "1200px", margin: "0 auto", border: "1px solid #74B4FF", bgcolor: "#191d2f", borderRadius: "236px", minHeight: "70px", mt: "40px"
      }}>
        <Box sx={{
          py: 0,
          px: 2

        }}>
          <Toolbar disableGutters sx={{
            display: "flex", justifyContent: "space-between", alignItems: "center", p: 0
          }}>
            {/* left side */}
            <Box
              onClick={toggleDrawer}
              sx={{
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
              <Box sx={{ width: "156px", display: "flex", justifyContent: "center", alignItems: "center", gap: "9px" }}>
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
            </Box>
            {/* menu */}
            <Box
              sx={{
                maxWidth: "660px",
                display: { lg: "flex", md: "flex", xs: "none", sm: "none" },
                gap: "40px",
                width: "50%",

              }}
            >
              {pages.map((page) => (
                <Box
                  key={page}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "inline-flex",
                    cursor: "pointer",
                    borderBottom: "1px solid transparent",
                    "&:hover": {
                      borderBottom: "1px solid",
                      borderColor: "#1aa3f1",
                    },
                  }}
                  onClick={() => handleScroll(page)}
                >
                  <P color="primary.contrastText">{t(page)}</P>
                </Box>
              ))}
            </Box>
            {/*  */}
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
            {/* button */}
            <Box

            >
              <NewButton
                text={user ? "Главная" : "Начать Сейчас"}
                variant={"gradient"}
                onClick={onBtnClick}
                glow
                sx={{
                  minWidth: "160px",


                }}
              />
            </Box>
          </Toolbar>
        </Box>
      </AppBar >
    </Box >
  );
};
export default ResponsiveAppBar;
