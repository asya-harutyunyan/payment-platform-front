import { DepositLists } from "@/components/organisms/deposits-list";
import { createFileRoute } from "@tanstack/react-router";

const DepositList = () => {
  return <DepositLists />;
};

export const Route = createFileRoute("/_auth/_admin/deposit-list/")({
  component: DepositList,
});
