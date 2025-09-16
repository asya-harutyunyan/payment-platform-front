import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
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
  isCollapsed?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ items, onItemClick, isCollapsed }) => {
  const location = useLocation();


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
                    borderRadius: "40px",
                    borderBottom: isActive ? "2px solid #24cacb" : "none",
                    backgroundColor: isActive ? "#053e83" : "transparent",
                    display: "flex",
                    ":hover": {
                      borderBottom: "2px solid #24cacb",
                      backgroundColor: "#053e83"
                    }
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
                        color:"white",               
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
      </List >
    </>
  );
};

export default Sidebar;
