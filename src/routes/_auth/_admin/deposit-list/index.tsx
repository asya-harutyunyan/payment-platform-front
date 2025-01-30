import { createFileRoute } from "@tanstack/react-router";

const DepositList = () => {
  return <div />;
};

export const Route = createFileRoute("/_auth/_admin/deposit-list/")({
  component: DepositList,
});
