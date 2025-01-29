import { createFileRoute } from "@tanstack/react-router";

const TransactionsList = () => {
  return <div />;
};

export const Route = createFileRoute("/_auth/_admin/transaction-list/")({
  component: TransactionsList,
});
