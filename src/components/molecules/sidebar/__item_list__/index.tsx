import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
export const userItems = [
  {
    text: "task_list",
    icon: <FormatListBulletedIcon />,
    link: "/user-task-list",
  },
  {
    text: "bank_info",
    icon: <MonetizationOnIcon />,
    link: "/info",
  },
  {
    text: "order_list",
    icon: <ImportExportIcon />,
    link: "/order-list",
  },
];
export const adminItems = [
  { text: "user_list", icon: <PersonIcon />, link: "/user-list" },
  { text: "walet_list", icon: <FormatListBulletedIcon />, link: "/walet-list" },
  { text: "order_list", icon: <ImportExportIcon />, link: "/orders" },
  {
    text: "transaction_list",
    icon: <ImportExportIcon />,
    link: "/transaction-list",
  },
];
