import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

export const userItems = [
  { text: "task_list", icon: <HomeIcon />, link: "/user-task-list" },
  {
    text: "bank_info",
    icon: <InfoIcon />,
    link: "/info",
  },
  {
    text: "order_list",
    icon: <InfoIcon />,
    link: "/order-list",
  },
];
export const adminItems = [
  { text: "user_list", icon: <HomeIcon />, link: "/user-list" },
  { text: "task_list", icon: <InfoIcon />, link: "/task-list" },
  { text: "order_list", icon: <InfoIcon />, link: "/orders" },
];
