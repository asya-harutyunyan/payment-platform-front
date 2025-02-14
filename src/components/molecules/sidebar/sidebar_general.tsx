import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { t } from "i18next";
import { FC } from "react";

interface SidebarProps {
  items: Array<{ link: string; icon: JSX.Element; text: string }>;
  onItemClick: () => void;
}

const Sidebar: FC<SidebarProps> = ({ items, onItemClick }) => {
  const location = useLocation();

  return (
    <List>
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;
        return (
          <ListItem key={index} sx={{ width: "100%", padding: "0 0 0 10px" }}>
            <Link
              to={item.link}
              style={{ textDecoration: "none", width: "100%" }}
              onClick={onItemClick}
            >
              <ListItemButton sx={{ width: "100%", padding: "20px 0" }}>
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? "white"
                      : theme.palette.secondary.contrastText,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <P
                  sx={{
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
    </List>
  );
};

export default Sidebar;
