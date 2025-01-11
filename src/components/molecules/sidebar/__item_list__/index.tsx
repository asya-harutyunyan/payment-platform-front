

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

export const userItems = [
    { text: "Task List", icon: <HomeIcon />, link: "/" },
    {
      text: "Bank Info",
      icon: <InfoIcon />,
      link: "/user-bank-info",
    },
    {
      text: "Transactions",
      icon: <InfoIcon />,
      link: "/user-history-transaktions",
    },
  ];
  export const adminItems = [
    { text: "User List", icon: <HomeIcon />, link: "/user-list" },
    { text: "Task List", icon: <InfoIcon />, link: "/task-list" },
    { text: "Order List", icon: <InfoIcon />, link: "/order-list" },
  ];