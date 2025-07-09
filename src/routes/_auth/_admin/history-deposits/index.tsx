import { HistoryDepositsComponent } from "@/components/organisms/history-deposits";
import { createFileRoute } from "@tanstack/react-router";

const HistoryList = () => {
  return <HistoryDepositsComponent />;
};

export const Route = createFileRoute("/_auth/_admin/history-deposits/")({
  component: HistoryList,
});
