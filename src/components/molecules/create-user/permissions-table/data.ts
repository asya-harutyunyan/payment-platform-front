type TAction = "delete" | "view" | "edit";

export type TPermissionItem = {
  name: string;
  prefix: string;
  checking: TAction;
};

export type Root = Array<{
  title: string;
  rows: Array<Array<TPermissionItem>>;
}>;

export const PERMISSIONS_DATA: Root = [
  {
    title: "Кошелек",
    rows: [
      [
        { prefix: "wallet", name: "wallet_view", checking: "view" },
        { prefix: "wallet", name: "wallet_store", checking: "edit" },
        { prefix: "wallet", name: "wallet_delete", checking: "delete" },
      ],
    ],
  },
  {
    title: "Пользователи",
    rows: [
      [
        { prefix: "users", name: "users_view", checking: "view" },
        { prefix: "users", name: "users_unblock", checking: "edit" },
      ],
    ],
  },
  {
    title: "Блокированные Пользователи",
    rows: [
      [
        {
          prefix: "blocked_users",
          name: "users_blocked.view",
          checking: "view",
        },
        { prefix: "blocked_users", name: "users_block", checking: "edit" },
      ],
    ],
  },
  {
    title: "Заказ",
    rows: [
      [
        { prefix: "orders", name: "orders_view", checking: "view" },
        { prefix: "orders", name: "orders_update.status", checking: "edit" },
        { prefix: "orders", name: "orders_delete", checking: "delete" },
      ],
      [
        {
          prefix: "orders_summary",
          name: "orders_view.summary",
          checking: "view",
        },
      ],
    ],
  },
  {
    title: "Депозит",
    rows: [
      [
        { prefix: "deposits", name: "deposits_view", checking: "view" },
        { prefix: "deposits", name: "deposits_confirm", checking: "edit" },
      ],
    ],
  },
  {
    title: "Просмотр статистики рефералов",
    rows: [
      [
        {
          prefix: "referred_users",
          name: "admin.referrals_stats",
          checking: "view",
        },
        {
          prefix: "referred_users",
          name: "admin.referrals_update",
          checking: "edit",
        },
      ],
    ],
  },
  {
    title: "Детали банка",
    rows: [
      [
        { prefix: "banks", name: "banks_viewAll", checking: "view" },
        { prefix: "banks", name: "users_card.unblock", checking: "edit" }, //edit
      ],
      [{ prefix: "banks", name: "users_card.block", checking: "edit" }],
    ],
  },
  {
    title: "Отчет",
    rows: [
      [
        {
          prefix: "new_reg_users",
          name: "users_view.newRegistered",
          checking: "view",
        },
      ],
      [
        {
          prefix: "new_reg_users",
          name: "users_report.view",
          checking: "view",
        },
      ],
      [
        {
          prefix: "orders_summary",
          name: "orders_view.summary",
          checking: "view",
        },
      ],
      [
        {
          prefix: "new_reg_users",
          name: "orders_view.processedAmounts",
          checking: "view",
        },
      ],
    ],
  },
  {
    title: "Платформы",
    rows: [
      [{ prefix: "platipay", name: "platiPay_view", checking: "view" }],
      [{ prefix: "platformX", name: "platformX_view", checking: "view" }],
    ],
  },
  {
    title: "Блокированные карты",
    rows: [
      [
        {
          prefix: "blocked_cards",
          name: "users_blockedCards.view",
          checking: "view",
        },
      ],
    ],
  },
];

export const FORMATTED_PERMISSIONS_DATA = PERMISSIONS_DATA.map((section) => ({
  title: section.title,
  rows: section.rows.map((row) => {
    const tempRow: (TPermissionItem | null)[] = [null, null, null];

    row.forEach((column) => {
      if (column.checking === "view") {
        tempRow[0] = column;
        return;
      }

      if (column.checking === "delete") {
        tempRow[2] = column;
        return;
      }

      if (column.checking === "edit") {
        tempRow[1] = column;
        return;
      }
    });
    return tempRow;
  }),
}));

export const viewPermissions = PERMISSIONS_DATA.reduce(
  (prevViewPermissions, currentItem) => {
    currentItem.rows.forEach((row) => {
      row.forEach((column) => {
        if (column.checking === "view") {
          prevViewPermissions.push(column);
        }
      });
    });
    return prevViewPermissions;
  },
  [] as TPermissionItem[]
);

export const actionPermissions = PERMISSIONS_DATA.reduce(
  (prevViewPermissions, currentItem) => {
    currentItem.rows.forEach((row) => {
      row.forEach((column) => {
        if (column.checking === "edit") {
          prevViewPermissions.push(column);
        }
      });
    });
    return prevViewPermissions;
  },
  [] as TPermissionItem[]
);

export const deletePermissions = PERMISSIONS_DATA.reduce(
  (prevViewPermissions, currentItem) => {
    currentItem.rows.forEach((row) => {
      row.forEach((column) => {
        if (column.checking === "delete") {
          prevViewPermissions.push(column);
        }
      });
    });
    return prevViewPermissions;
  },
  [] as TPermissionItem[]
);

const ALL_PERMISSIONS = [
  ...viewPermissions,
  ...actionPermissions,
  ...deletePermissions,
];

export const PERMISSIONS_GROUPED_BY_PREFIX = ALL_PERMISSIONS.reduce(
  (prevGroups, permissionItem) => {
    if (!prevGroups[permissionItem.prefix]) {
      prevGroups[permissionItem.prefix] = [permissionItem];
    }

    prevGroups[permissionItem.prefix].push(permissionItem);

    return prevGroups;
  },
  {} as Record<string, TPermissionItem[]>
);

export const PERMISSION_NAME_GROUPED_BY_PREFIX = ALL_PERMISSIONS.reduce(
  (prevGroups, permissionItem) => {
    if (!prevGroups[permissionItem.prefix]) {
      prevGroups[permissionItem.prefix] = [permissionItem.name];
    }

    prevGroups[permissionItem.prefix].push(permissionItem.name);

    return prevGroups;
  },
  {} as Record<string, string[]>
);
