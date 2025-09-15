import Icon1 from "@/assets/images/how_it_works_icon_1.svg";
import Icon2 from "@/assets/images/how_it_works_icon_2.svg";
import Icon3 from "@/assets/images/how_it_works_icon_3.svg";

type HowItWorksData = {
  id: number;
  icon: string,
  title: string;
  description: string,
  btnText: string;
  btnAction: string

};

export const HowItWorksData: HowItWorksData[] = [
  {
    id: 1,
    icon: Icon1,
    title: "Внесите депозит",
    description:
      "Внесите депозит в криптовалюте или фиатных деньгах.Можно начать с небольшой суммы, чтобы протестировать платформу.",
    btnText: "Сделать депозит",
    btnAction: "deposit"
  },
  {
    id: 2,
    icon: Icon2,
    title: "Ожидайте заказы",
    description:
      "Как только депозит будет подтверждён, заявки начнут поступать в течение 4 часов.Регулярно проверяйте платформу и вручную подтверждайте получение каждого заказа.",
    btnText: "Проверить заказы",
    btnAction: "orders"
  },
  {
    id: 3,
    icon: Icon3,
    title: "Получите прибыль",
    description:
      "Ваша прибыль 5% от суммы депозита  будет автоматически зачислена на вашу карту после подтверждения заказов.",
    btnText: "Посмотреть прибыль",
    btnAction: "profit"
  },
];
