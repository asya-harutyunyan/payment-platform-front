import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DvrIcon from "@mui/icons-material/Dvr";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
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

export const superAdminItems = [
  {
    text: "user_list",
    icon: <PersonIcon />,
    link: "/user-list",
    subItems: [
      {
        link: "/user-list",
        text: "user_list",
        permission: "users_view",
      },
      {
        link: "/blocked-user-list",
        text: "blocked-user_list",
        permission: "blocked_users.view",
      },
      {
        link: "/create-user",
        text: "create-user",
      },
    ],
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    permission: "deposits_view",
    link: "/deposit-list",
  },
  {
    text: "order_list",
    icon: <DvrIcon />,
    permission: "orders_view",
    link: "/order-list",
  },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    permission: "wallet_view",
    link: "/wallet-list",
  },
  {
    text: "reports",
    icon: <ChecklistRtlIcon />,
    subItems: [
      {
        link: "/reports-new-users",
        text: "new-registered-users",
        permission: "users_view.newRegistered",
      },

      {
        link: "/reports-users",
        text: "reports-users",
        permission: "users_report.view",
      },
      {
        link: "/reports-processed-amount",
        text: "processed-amounts",
        permission: "orders_view.processedAmounts",
      },

      {
        link: "/reports-summary",
        text: "reports-summary",
        permission: "orders_view.summary",
      },
    ],
    link: "/reports-new-users",
  },

  {
    text: "platipay",
    icon: <ChecklistRtlIcon />,
    permission: "platiPay_view",
    link: "/platipay",
  },
  {
    text: "bank_card_list",
    icon: <ChecklistIcon />,
    permission: "users_view.bankDetails",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blockedCards.view",
    link: "/blocked-card-list",
  },
];

export const adminItems = [
  {
    text: "user_list",
    icon: <PersonIcon />,
    link: "/user-list",
    subItems: [
      {
        link: "/user-list",
        text: "user_list",
        permission: "users_view",
      },
      {
        link: "/blocked-user-list",
        text: "blocked-user_list",
        permission: "blocked_users.view",
      },
      {
        link: "/create-user",
        text: "create-user",
      },
    ],
  },
  {
    text: "referred_users",
    permission: "admin.referrals_stats",
    icon: <PeopleOutlineIcon />,
    link: "/referred-users",
  },
  {
    text: "deposit_list",
    icon: <FormatListBulletedIcon />,
    permission: "deposits_view",
    link: "/deposit-list",
  },
  {
    text: "order_list",
    icon: <DvrIcon />,
    permission: "orders_view",
    link: "/order-list",
  },
  {
    text: "wallet_list",
    icon: <WalletIcon />,
    permission: "wallet_view",
    link: "/wallet-list",
  },
  {
    text: "reports",
    icon: <ChecklistRtlIcon />,
    subItems: [
      {
        link: "/reports-new-users",
        text: "new-registered-users",
        permission: "users_view.newRegistered",
      },

      {
        link: "/reports-users",
        text: "reports-users",
        permission: "users_report.view",
      },
      {
        link: "/reports-processed-amount",
        text: "processed-amounts",
        permission: "orders_view.processedAmounts",
      },

      {
        link: "/reports-summary",
        text: "reports-summary",
        permission: "orders_view.summary",
      },
    ],
    link: "/reports-new-users",
  },

  {
    text: "platipay",
    icon: <ChecklistRtlIcon />,
    permission: "platiPay_view",
    link: "/platipay",
  },
  {
    text: "bank_card_list",
    icon: <ChecklistIcon />,
    permission: "users_view.bankDetails",
    link: "/bank-card-list",
  },
  {
    text: "blocked_card_list",
    icon: <WebIcon />,
    permission: "users_blockedCards.view",
    link: "/blocked-card-list",
  },
];
