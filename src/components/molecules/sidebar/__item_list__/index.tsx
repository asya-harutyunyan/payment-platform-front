import Chat from "@/assets/images/chat.svg";
import ProfileIcon from "@/assets/images/profile.svg";
import CardsIcon from "@/assets/images/sidebar_cards.svg";
import DepositIcon from "@/assets/images/sidebar_deposits.svg";
import OrdersIcon from "@/assets/images/sidebar_orders.svg";
import ReferalSystem from "@/assets/images/sidebar_referal_system.svg";
import StartIcon from "@/assets/images/sidebar_start.svg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DvrIcon from "@mui/icons-material/Dvr";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SettingsIcon from "@mui/icons-material/Settings";
import WalletIcon from "@mui/icons-material/Wallet";
import WebIcon from "@mui/icons-material/Web";

export const userItems = [
  {
    text: "profile",
    icon: (
      <img src={ProfileIcon} alt="start" style={{ width: 32, height: 32 }} />
    ),
    link: "/profile",
  },
  {
    text: "task_list",
    icon: <img src={StartIcon} alt="start" style={{ width: 32, height: 32 }} />,
    link: "/wallet",
  },
  {
    text: "bank_info",
    icon: <img src={CardsIcon} alt="start" style={{ width: 32, height: 32 }} />,
    link: "/my-information",
  },
  {
    text: "deposit_list",
    icon: (
      <img src={DepositIcon} alt="start" style={{ width: 32, height: 32 }} />
    ),
    link: "/deposit-info",
  },
  {
    text: "orders_sidebar",
    icon: (
      <img src={OrdersIcon} alt="start" style={{ width: 32, height: 32 }} />
    ),
    link: "/orders",
  },
  {
    text: "referral_system",
    icon: (
      <img src={ReferalSystem} alt="start" style={{ width: 32, height: 32 }} />
    ),
    link: "/partner-program",
  },

  {
    text: "chat",
    icon: <img src={Chat} alt="start" style={{ width: 32, height: 32 }} />,
    link: "/chat",
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
    permission: "superAdmin_freezed.view",
  },
  {
    link: "/create-user",
    icon: <PersonAddAltIcon />,
    text: "create-user",
    permission: "superAdmin_grant_permissions.create",
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "manage-moderators",
    permission: "superAdmin_deposits_limits.view",
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
    permission: "superAdmin_action_log_deposits.view",
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
    permission: "banks_viewAll",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blocked.view",
    link: "/blocked-card-list",
  },
  {
    text: "history",
    icon: <ManageSearchIcon />,
    link: "/history",
    permission: "superAdmin_action_log.view",
  },
  {
    text: "system_settings",
    icon: <SettingsIcon />,
    link: "/system-settings",
    permission: "system_conf.update",
  },
  {
    text: "orders_for_refound",
    icon: <ManageSearchIcon />,
    link: "/orders-for-refound",
    permission: "admin.referral_orders_all.view",
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
    permission: "superAdmin_freezed.view",
  },
  {
    link: "/create-user",
    icon: <PersonAddAltIcon />,
    text: "create-user",
    permission: "superAdmin_grant_permissions.create",
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "manage-moderators",
    permission: "superAdmin_deposits_limits.view",
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
    permission: "superAdmin_action_log_deposits.view",
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
    permission: "orders_deleted.view",
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
    permission: "platformX_view",
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
    permission: "banks_viewAll",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blocked.view",
    link: "/blocked-card-list",
  },
  {
    text: "history",
    icon: <ManageSearchIcon />,
    link: "/history",
    permission: "superAdmin_action_log.view",
  },
  {
    text: "system_settings",
    icon: <SettingsIcon />,
    link: "/system-settings",
    permission: "system_conf.update",
  },
  {
    text: "orders_for_refound",
    icon: <ManageSearchIcon />,
    link: "/orders-for-refound",
    permission: "admin.referral_orders_all.view",
  },
];
