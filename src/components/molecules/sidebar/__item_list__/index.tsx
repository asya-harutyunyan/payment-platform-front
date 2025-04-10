import ChecklistIcon from "@mui/icons-material/Checklist";
import DvrIcon from "@mui/icons-material/Dvr";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";

export const userItems = [
  {
    text: "bank_info",
    icon: <MonetizationOnIcon />,
    link: "/my-information",
  },
  {
    text: "task_list",
    icon: <FormatListBulletedIcon />,
    link: "/wallet",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-info",
  },
  {
    text: "order_list",
    icon: <ImportExportIcon />,
    link: "/orders",
  },
];

export const adminItems = [
  { text: "user_list", icon: <PersonIcon />, link: "/user-list" },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-list",
  },
  { text: "order_list", icon: <DvrIcon />, link: "/order-list" },
  {
    text: "bank_card_list",
    icon: <ChecklistIcon />,
    link: "/bank-card-list",
  },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    link: "/wallet-list",
  },
  {
    text: "blocked_card_list",
    icon: <WalletIcon />,
    link: "/blocked-card-list",
  },
];
