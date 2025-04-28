import { useAuth } from "@/context/auth.context";
// import { useAppDispatch, useAppSelector } from "@/store";
// import { getPermissionsThunk } from "@/store/reducers/permissions/thunks";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { t } from "i18next";
import { FC } from "react";

interface SidebarProps {
  items: Array<{ link: string; icon: JSX.Element; text: string }>;
  onItemClick: () => void;
}

const Sidebar: FC<SidebarProps> = ({ items, onItemClick }) => {
  // const dispatch = useAppDispatch();
  const location = useLocation();
  const { wallet } = useAuth();
  const { user } = useAuth();

  // const { permissions } = useAppSelector((state) => state.permissions);
  // useEffect(() => {
  //   if (user) {
  //     dispatch(getPermissionsThunk(user.id));
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log(permissions);
  // }, [permissions]);

  return (
    <List>
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;
        return (
          <ListItem key={index} sx={{ width: "100%", padding: "0" }}>
            <Link
              to={item.link}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
              onClick={onItemClick}
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  padding: "13px 0",
                  ":hover": {
                    backgroundColor: "#202a6083",
                    borderRadius: "5px",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? "white"
                      : theme.palette.secondary.contrastText,
                    paddingLeft: "10px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <P
                  sx={{
                    fontSize: "0.9rem",
                    color: isActive
                      ? "white"
                      : theme.palette.secondary.contrastText,
                  }}
                >
                  {t(item.text)}
                </P>
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
      {user?.role === "client" && (
        <>
          <Box sx={{ display: "flex", padding: "25px 10px 10px 10px" }}>
            <P
              sx={{
                color: theme.palette.secondary.contrastText,
                paddingRight: "10px",
              }}
            >
              {t("earnings_amount")}:
            </P>
            <P
              sx={{
                color: "white",
              }}
            >
              {wallet?.processing_amount ?? "0"} ₽
            </P>
          </Box>
          <Box sx={{ display: "flex", padding: "10px" }}>
            <P
              sx={{
                color: theme.palette.secondary.contrastText,
                paddingRight: "10px",
              }}
            >
              {t("expected_profit")}:
            </P>
            <P
              sx={{
                color: "white",
              }}
            >
              {wallet?.profits ?? "0"} ₽
            </P>
          </Box>
        </>
      )}
    </List>
  );
};

export default Sidebar;
