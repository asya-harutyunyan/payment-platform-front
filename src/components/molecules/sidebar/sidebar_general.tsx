import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
interface SubItems {
  link: string;
  text: string;
}
interface SidebarProps {
  items: Array<{
    link: string;
    icon: JSX.Element;
    text: string;
    subItems?: SubItems[];
  }>;
  onItemClick: () => void;
}

const Sidebar: FC<SidebarProps> = ({ items, onItemClick }) => {
  const location = useLocation();
  const { wallet } = useAuth();
  const { user } = useAuth();

  return (
    <List>
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;
        return (
          <ListItem
            key={index}
            sx={{
              width: "100%",
              padding: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
            {item.subItems && (
              <List component="div" disablePadding sx={{ width: "90%" }}>
                {item.subItems.map((sub, subIndex) => {
                  return (
                    <ListItem key={subIndex}>
                      <Link
                        to={sub.link}
                        style={{ textDecoration: "none", width: "100%" }}
                        onClick={onItemClick}
                      >
                        <ListItemButton
                          sx={{
                            padding: "10px 15px",
                            borderRadius: "5px",
                            backgroundColor: "#202a6083",
                            ":hover": {
                              backgroundColor: "#202a6083",
                            },
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              width: "7px",
                              color: isActive
                                ? "white"
                                : theme.palette.secondary.contrastText,
                              paddingRight: "10px",
                            }}
                          />{" "}
                          <P
                            sx={{
                              fontSize: "0.85rem",
                              color: isActive
                                ? "white"
                                : theme.palette.secondary.contrastText,
                            }}
                          >
                            {t(sub.text)}
                          </P>
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            )}
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
