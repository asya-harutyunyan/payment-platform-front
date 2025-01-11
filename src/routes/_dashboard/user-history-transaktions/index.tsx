import { UserBankTransaktionsComponent } from "@/components/organisms/user-bank-transaktions";
import { createFileRoute } from "@tanstack/react-router";

const HistoryTransaktions = () => {
  return <UserBankTransaktionsComponent />;
};

export const Route = createFileRoute("/_dashboard/user-history-transaktions/")({
  component: HistoryTransaktions,
});
