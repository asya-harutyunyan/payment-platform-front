import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";

export const userItems = [
  {
    text: "task_list",
    icon: <FormatListBulletedIcon />,
    link: "/wallet",
  },
  {
    text: "bank_info",
    icon: <MonetizationOnIcon />,
    link: "/my-information",
  },
  {
    text: "order_list",
    icon: <ImportExportIcon />,
    link: "/orders",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-info",
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
    text: "wallet_list",
    icon: <AccountBalanceWalletIcon />,
    link: "/wallet-list",
  },
];
