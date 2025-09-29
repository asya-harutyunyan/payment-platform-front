import Icon1 from "@/assets/images/transfer_card_icon_1.svg";
import Icon2 from "@/assets/images/transfer_card_icon_2.svg";

export type TransferItem = {
  id: number;
  icon: string;
  title: string;
  status: string;
  time: string;
  key: "card_orders_amount" | "orders_for_crypto" | "orders_for_fiat";
};

export type MappedTransfer = TransferItem & { amount: string };

export const Transfers: TransferItem[] = [
  {
    id: 1,
    icon: Icon1,
    title: "Оборот по картам",
    status: "Вывод завершён",
    time: "1 месяц",
    key: "card_orders_amount",
  },
  {
    id: 2,
    icon: Icon1,
    title: "Оборот в криптовалюте",
    status: "Вывод завершён",
    time: "1 месяц",
    key: "orders_for_crypto",
  },
  {
    id: 3,
    icon: Icon2,
    title: "Оборот в фиате",
    status: "Вывод завершён",
    time: "1 месяц",
    key: "orders_for_fiat",
  },
];
