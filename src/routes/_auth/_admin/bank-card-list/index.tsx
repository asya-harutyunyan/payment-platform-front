import { BankCardLists } from "@/components/organisms/bank-card-list/bank-card-list";
import { createFileRoute } from "@tanstack/react-router";

const BankCardList = () => {
  return <BankCardLists />;
};

export const Route = createFileRoute("/_auth/_admin/bank-card-list/")({
  component: BankCardList,
});
