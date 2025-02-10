import { DepositInfoUser } from "@/components/organisms/deposit-info-user";
import { createFileRoute } from "@tanstack/react-router";

const UserDetail = () => {
  return <DepositInfoUser />;
};

export const Route = createFileRoute("/_auth/_user/deposit-info/$id")({
  component: UserDetail,
});
