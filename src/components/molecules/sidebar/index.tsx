import bg from "@/assets/images/modal.png";
import JivoChat from "@/common/jivosite";
import Button from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";
import { BasicModal } from "@/components/atoms/modal";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/reducers/auth/authSlice/thunks";
import theme from "@/styles/theme";
import { H3, H6 } from "@/styles/typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useState } from "react";
import { adminItems, userItems } from "./__item_list__";
import drawerStyles from "./drawer_styles";
import GeneralInfo from "./GeneralInfo";
import LogoutButton from "./logout_button";
import MessageButton from "./message";
import Sidebar from "./sidebar_general";
interface DashboardPageProps {
  children?: ReactNode;
}

const DashboardPage: FC<DashboardPageProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(userItems);
  const [open, setOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { deposit } = useAppSelector((state) => state.deposit);

  useEffect(() => {
    setSidebarItems(user?.role === "admin" ? adminItems : userItems);
  }, [user?.role]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = async () => {
    const resultAction = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(resultAction)) {
      navigate({ to: "/auth/sign-in" });
    } else {
      console.error("Logout failed:", resultAction.payload);
    }
  };
  const handleOpenChat = () => {
    // setIsOpen(true);
    toggleDrawer();
    //@ts-expect-error script added global value
    if (typeof jivo_api !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      jivo_api.open();
    } else {
      console.error("JivoChat script not loaded yet.");
    }
  };
  // useEffect(() => {
  //   if (deposit?.type === DEPOSIT_TYPES.FIAT) {
  //     setIsOpen(true);
  //   }
  // }, [deposit, isOpen]);
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
        <Box sx={{ height: "85%" }}>
          <GeneralInfo />
          <Sidebar items={sidebarItems} onItemClick={toggleDrawer} />
        </Box>
        <Box
          sx={{
            height: "15%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {user?.role === "client" && (
            <MessageButton handleOpen={handleOpenChat} />
          )}
          <LogoutButton handleLogout={handleLogout} />
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
          <Box sx={{ height: "85%" }}>
            <GeneralInfo />
            <Sidebar items={sidebarItems} onItemClick={toggleDrawer} />
          </Box>
          <Box
            sx={{
              height: "15%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {user?.role === "client" && (
              <MessageButton handleOpen={handleOpenChat} />
            )}
            <LogoutButton handleLogout={handleLogout} />
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

      <JivoChat />
    </Box>
  );
};

export default DashboardPage;
