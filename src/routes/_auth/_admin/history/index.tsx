import { HistoryComponent } from "@/components/organisms/history";
import { createFileRoute } from "@tanstack/react-router";

const HistoryList = () => {
  return <HistoryComponent />;
};

export const Route = createFileRoute("/_auth/_admin/history/")({
  component: HistoryList,
});
