import MenuIcon from "@/assets/images/menu_icon.svg";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { Colors } from "@/constants";
import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
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
      setIsDrawerOpen(false)
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
    backgroundColor: Colors.gradientBg,
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
    <AppBar position="static" sx={{
      maxWidth: "1200px", boxShadow: "none", margin: "0 auto", border: { xs: "none", sm: "1px solid #74B4FF" }, bgcolor: "transparent", borderRadius: { xs: "0", sm: "236px" }, mt: { xs: "16px", sm: "40px" }
    }}>
      <Box sx={{
        py: 0,
        px: 2

      }}>
        <Toolbar disableGutters sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center", p: 0
        }}>
          <Box
            sx={{
              width: { xs: "100%", md: "auto" },
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "space-between",
                md: "center"
              },
            }}
          >
            <Box sx={{ width: "156px", display: "flex", justifyContent: "center", alignItems: "center", gap: "9px" }}>
              <Logo />
              <H3
                sx={{
                  fontSize: {
                    xs: "20px",
                    md: "inherit",
                  },
                }}
              >
                PayHub
              </H3>
            </Box>

            <Box
              display={{ xs: "flex", md: "none" }}
              width="40px"
              height="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              sx={{
                backgroundColor: "#101f5e",
                boxShadow: [
                  "inset 0px 0.33px 13.09px 0px rgba(13,137,207,0.20)",
                  "inset 0px 1.31px 5.89px 0px rgba(8,59,88,0.30)",
                  "inset 0px 32.07px 32.73px -15.71px rgba(0,161,253,0.30)",
                  "inset 0px -26.84px 22.26px -20.95px rgba(14,78,114,0.30)",
                  "inset 0px 2.29px 3.60px -1.31px rgba(255,255,255,1)",
                  "inset 0px 12.76px 18.33px -11.78px rgba(255,255,255,0.50)",
                ].join(","),
              }}
            >
              <Box
                width="23px"
                height="23px"
                onClick={toggleDrawer}

              >
                <img
                  src={MenuIcon}
                  alt="Menu icon"
                />
              </Box>
            </Box>
          </Box>
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
                <P color="primary.contrastText" textAlign="center">{t(page)}</P>
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
          <NewButton
            text={user ? "Главная" : "Начать Сейчас"}
            variant={"gradient"}
            onClick={onBtnClick}
            glow
            sx={{
              minWidth: "160px",
              display: { xs: "none", md: "block" },
            }}
          />
        </Toolbar>
      </Box >
    </AppBar >
  );
};
export default ResponsiveAppBar;
