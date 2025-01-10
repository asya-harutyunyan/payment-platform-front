import React, { ReactElement, ReactNode } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,

} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "@tanstack/react-router";

const DashboardPage = ({ children }: ReactElement) => {
  const sidebarItems = [
    { text: "Home", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Test", icon: <InfoIcon />, link: "/dashboard/test" },
  ];

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent" // Keeps the sidebar always visible
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4", // Optional background color
            paddingTop: "10px",
          },
        }}
      >
        <List>
          {/* Map over the sidebar items and create the list with icons */}
          {sidebarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Link to={item.link}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content area */}
      <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
    </div>
  );
};

export default DashboardPage;
