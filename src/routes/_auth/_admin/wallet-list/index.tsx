import { Wallet } from "@/components/organisms/wallet";
import { createFileRoute } from "@tanstack/react-router";

const WalletList = () => {
  return <Wallet />;
};

export const Route = createFileRoute("/_auth/_admin/wallet-list/")({
  component: WalletList,
});
