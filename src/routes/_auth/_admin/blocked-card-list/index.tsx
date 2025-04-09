import { BlockedCardList } from "@/components/organisms/blocked-card-list/blocked-card-list";
import { createFileRoute } from "@tanstack/react-router";

const BankCardList = () => {
  return <BlockedCardList />;
};

export const Route = createFileRoute("/_auth/_admin/blocked-card-list/")({
  component: BankCardList,
});
