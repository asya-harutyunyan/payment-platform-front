import Icon1 from "@/assets/images/transfer_card_icon_1.svg";
import Icon2 from "@/assets/images/transfer_card_icon_2.svg";

type Transfers = {
    id: number,
    icon: string,
    amount: string,
    title: string,
    status: string,
    time: string
}


export const Transfers: Transfers[] = [
    {
        id: 1,
        icon: Icon1,
        amount: "$37,740",
        title: "Перевод на  Банковский Счёт",
        status: "Вывод завершён",
        time: "3 часа назад",
    },
    {
        id: 2,
        icon: Icon1,
        amount: "$8,349",
        title: "Перевод на  Банковский Счёт",
        status: "Вывод завершён",
        time: "1 день назад",
    },
    {
        id: 3,
        icon: Icon2,
        amount: "$13,930",
        title: "Перевод цифровых активов",
        status: "Вывод завершён",
        time: "2 дня назад",
    },
];
