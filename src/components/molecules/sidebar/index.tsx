import {
  Box,
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
import { FC, ReactNode } from "react";


interface DashboardPageProps {
  children?: ReactNode; 
}

const DashboardPage :FC<DashboardPageProps> = ({ children }) => {
  const sidebarItems = [
    { text: "Home", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Test", icon: <InfoIcon />, link: "/dashboard/test" },
  ];

  return (
    <Box sx={{ display: "flex"}}>
      <Drawer
        variant="permanent" 
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4", 
            paddingTop: "10px",
          },
        }}
      >
        <List>
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

      <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
    </Box>
  );
};

export default DashboardPage;
