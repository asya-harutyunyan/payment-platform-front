import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DvrIcon from "@mui/icons-material/Dvr";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SettingsIcon from "@mui/icons-material/Settings";
import WalletIcon from "@mui/icons-material/Wallet";
import WebIcon from "@mui/icons-material/Web";

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
    icon: <FormatListNumberedIcon />,
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
  {
    text: "orders_history",
    icon: <GroupIcon />,
    link: "/orders-history",
  },
];

export const superAdminItems = [
  {
    link: "/user-list",
    icon: <PersonIcon />,
    text: "user_list",
    permission: "users_view",
  },

  {
    link: "/blocked-user-list",
    icon: <PersonRemoveIcon />,
    text: "blocked-user_list",
    permission: "blocked_users.view",
  },
  {
    link: "/freezed-user-list",
    icon: <PersonIcon />,
    text: "freezed_user_list",
  },
  {
    link: "/create-user",
    icon: <PersonAddAltIcon />,
    text: "create-user",
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "manage-moderators",
    permission: "admin.manage-moderators",
    icon: <GroupIcon />,
    link: "/manage-moderators",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    permission: "deposits_view",
    link: "/deposit-list",
  },
  {
    text: "history-deposits",
    icon: <HistoryIcon />,
    link: "/history-deposits",
  },
  {
    text: "order_list",
    icon: <DvrIcon />,
    permission: "orders_view",
    link: "/order-list",
  },
  {
    link: "/deleted-orders",
    icon: <WebIcon />,
    text: "deleted_orders_list",
    permission: "deleted_orders.view",
  },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    permission: "wallet_view",
    link: "/wallet-list",
  },
  {
    link: "/reports-new-users",
    text: "new-registered-users",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "users_view.newRegistered",
  },

  {
    link: "/reports-users",
    text: "reports-users",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "users_report.view",
  },
  {
    link: "/reports-processed-amount",
    text: "processed-amounts",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "orders_view.processedAmounts",
  },

  {
    link: "/reports-summary",
    text: "reports-summary",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "orders_view.summary",
  },

  {
    text: "platipay",
    icon: <AllInboxIcon />,
    permission: "platiPay_view",
    link: "/platipay",
  },
  {
    text: "bank_card_list",
    icon: <AccountBalanceIcon />,
    permission: "users_view.bankDetails",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blockedCards.view",
    link: "/blocked-card-list",
  },
  {
    text: "history",
    icon: <ManageSearchIcon />,
    link: "/history",
  },
  {
    text: "system_settings",
    icon: <SettingsIcon />,
    link: "/system-settings",
  },
];

export const adminItems = [
  {
    link: "/user-list",
    icon: <PersonIcon />,
    text: "user_list",
    permission: "users_view",
  },

  {
    link: "/blocked-user-list",
    icon: <PersonRemoveIcon />,
    text: "blocked-user_list",
    permission: "blocked_users.view",
  },
  {
    link: "/freezed-user-list",
    icon: <PersonIcon />,
    text: "freezed_user_list",
  },
  {
    link: "/create-user",
    icon: <PersonAddAltIcon />,
    text: "create-user",
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "manage-moderators",
    permission: "admin.manage-moderators",
    icon: <GroupIcon />,
    link: "/manage-moderators",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    permission: "deposits_view",
    link: "/deposit-list",
  },
  {
    text: "history-deposits",
    icon: <HistoryIcon />,
    link: "/history-deposits",
  },
  {
    text: "order_list",
    icon: <DvrIcon />,
    permission: "orders_view",
    link: "/order-list",
  },
  {
    link: "/deleted-orders",
    icon: <WebIcon />,
    text: "deleted_orders_list",
    permission: "deleted_orders.view",
  },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    permission: "wallet_view",
    link: "/wallet-list",
  },
  {
    link: "/reports-new-users",
    text: "new-registered-users",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "users_view.newRegistered",
  },

  {
    link: "/reports-users",
    text: "reports-users",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "users_report.view",
  },
  {
    link: "/reports-processed-amount",
    text: "processed-amounts",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "orders_view.processedAmounts",
  },

  {
    link: "/reports-summary",
    text: "reports-summary",
    icon: <FiberManualRecordIcon sx={{ fontSize: "15px" }} />,
    permission: "orders_view.summary",
  },

  {
    text: "platipay",
    icon: <AllInboxIcon />,
    permission: "platiPay_view",
    link: "/platipay",
  },
  {
    text: "bank_card_list",
    icon: <AccountBalanceIcon />,
    permission: "users_view.bankDetails",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blockedCards.view",
    link: "/blocked-card-list",
  },
  {
    text: "history",
    icon: <ManageSearchIcon />,
    link: "/history",
  },
  {
    text: "system_settings",
    icon: <SettingsIcon />,
    link: "/system-settings",
  },
  {
    text: "orders_for_refound",
    icon: <ManageSearchIcon />,
    link: "/orders-for-refound",
  },
];
