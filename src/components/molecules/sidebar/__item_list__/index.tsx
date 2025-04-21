import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DvrIcon from "@mui/icons-material/Dvr";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import WalletIcon from "@mui/icons-material/Wallet";
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
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-info",
  },
  {
    text: "order_list",
    icon: <ImportExportIcon />,
    link: "/orders",
  },
  {
    text: "partner_program",
    icon: <GroupIcon />,
    link: "/partner-program",
  },
];

export const adminItems = [
  { text: "user_list", icon: <PersonIcon />, link: "/user-list" },
  {
    text: "referred_users",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    link: "/deposit-list",
  },
  { text: "order_list", icon: <DvrIcon />, link: "/order-list" },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    link: "/wallet-list",
  },
  {
    text: "reports",
    icon: <ChecklistRtlIcon />,
    link: "/reports",
  },

  {
    text: "platipay",
    icon: <ChecklistRtlIcon />,
    link: "/platipay",
  },
  {
    text: "bank_card_list",
    icon: <ChecklistIcon />,
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <PlaylistRemoveIcon />,
    link: "/blocked-card-list",
  },
];
