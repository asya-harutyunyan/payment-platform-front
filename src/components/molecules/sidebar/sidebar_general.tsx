import { useAuth } from "@/context/auth.context";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { t } from "i18next";
import { FC } from "react";
import useWalletInfo from "./_services/useWalletInfo";

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
  isCollapsed?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ items, onItemClick, isCollapsed }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { walletInfo } = useWalletInfo();

  return (
    <>
      <style>
        {`
        .scrollable-text-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .scrollable-text {
          display: inline-block;
          white-space: nowrap;
          transform: translateX(0%);
          transition: transform 6s linear;
          will-change: transform;
        }
        @media (min-width:768px) {

        .scrollable-text-wrapper:hover .scrollable-text {
          transform: translateX(-50%);
        }}
      `}
      </style>

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
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={onItemClick}
              >
                <ListItemButton
                  sx={{
                    width: "100%",
                    height: "60px",
                    borderBottom: "1px solid #40404078",
                    background: isActive
                      ? "linear-gradient(to right, transparent 0%,rgba(42, 60, 110, 0.95) 20%,rgba(42, 60, 110, 0.95) 80%,transparent 100%)"
                      : "",
                    display: "flex",
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
                      display: "flex",
                      justifyContent: isCollapsed ? "center" : "start",
                      minWidth: "40px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {/* Scrolling text wrapper */}
                  <div
                    className="scrollable-text-wrapper"
                    style={{
                      opacity: isCollapsed ? 0 : 1,
                      flexGrow: 1,
                      width: isCollapsed ? "0" : "100%",
                    }}
                  >
                    <P
                      className="scrollable-text"
                      sx={{
                        fontSize: "0.9rem",
                        color: isActive
                          ? "white"
                          : theme.palette.secondary.contrastText,
                        fontWeight: isActive ? "700" : "",
                        padding: "0",
                        minWidth: isCollapsed ? "0" : "40px",
                      }}
                    >
                      {t(item.text)}
                    </P>
                  </div>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}

        {user?.role === "client" &&
          walletInfo &&
          typeof walletInfo === "function" &&
          walletInfo() !== undefined && <>{!isCollapsed ? walletInfo() : ""}</>}
      </List>
    </>
  );
};

export default Sidebar;
