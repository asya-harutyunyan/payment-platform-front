import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";

export const userItems = [
  {
    text: "task_list",
    icon: <FormatListBulletedIcon />,
    link: "/user-task-list",
  },
  {
    text: "bank_info",
    icon: <MonetizationOnIcon />,
    link: "/my-information",
  },
  {
    text: "order_list",
    icon: <ImportExportIcon />,
    link: "/order-list",
  },
];

export const adminItems = [
  { text: "user_list", icon: <PersonIcon />, link: "/user-list" },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-list",
  },
  { text: "order_list", icon: <FilterFramesIcon />, link: "/order-list" },
  {
    text: "transaction_list",
    icon: <ImportExportIcon />,
    link: "/transaction-list",
  },
  {
    text: "wallet_list",
    icon: <AccountBalanceWalletIcon />,
    link: "/wallet-list",
  },
];
