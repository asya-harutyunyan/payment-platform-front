import Icon1 from "@/assets/images/why_choose_us_icon1.svg";
import Icon2 from "@/assets/images/why_choose_us_icon2.svg";
import Icon3 from "@/assets/images/why_choose_us_icon3.svg";
import Icon4 from "@/assets/images/why_choose_us_icon4.svg";

type Feature = {
    id: number;
    icon: string,
    title: string;
    text: string;

};

export const FEATURES: Feature[] = [
    {
        id: 1,
        icon: Icon1,
        title: "Надёжность и безопасность",
        text:
            "Ваши средства в надёжных руках. Мы используем передовые технологии защиты, чтобы ваши деньги были в безопасности 24/7. Спокойствие и уверенность – ваша инвестиция под надёжной защитой.",
    },
    {
        id: 2,
        icon: Icon2,
        title: "Гибкие условия пополнения",
        text:
            "Начните с малого или вложите больше. Мы предлагаем удобные варианты пополнения для разных бюджетов и финансовых целей.",

    },
    {
        id: 3,
        icon: Icon3,
        title: "Привлекательная доходность",
        text:
            "Мы предлагаем доход выше, чем у обычных вкладов и традиционных инвестиций. Зарабатывайте больше вместе с PayHub.",

    },
    {
        id: 4,
        icon: Icon4,
        title: "Просто и прозрачно",
        text:
            "Никаких скрытых комиссий. Никаких сложных условий. Только понятный процесс и прозрачные правила.",
    },
];
