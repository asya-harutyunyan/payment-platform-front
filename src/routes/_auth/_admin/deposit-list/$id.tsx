import { DepositInfo } from "@/components/organisms/deposit-info";
import { createFileRoute } from "@tanstack/react-router";

const UserDetail = () => {
  return <DepositInfo />;
};

export const Route = createFileRoute("/_auth/_admin/deposit-list/$id")({
  component: UserDetail,
});
