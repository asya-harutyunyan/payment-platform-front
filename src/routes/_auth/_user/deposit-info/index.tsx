import { DepositLists } from "@/components/organisms/deposits-list";
import { createFileRoute } from "@tanstack/react-router";

const DepositInfo = () => {
  return <DepositLists />;
};

export const Route = createFileRoute("/_auth/_user/deposit-info/")({
  component: DepositInfo,
});
