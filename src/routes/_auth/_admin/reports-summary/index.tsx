import { ReportsSummary } from "@/components/organisms/reports-summary";
import { createFileRoute } from "@tanstack/react-router";

const ReportsSummaryList = () => {
  return <ReportsSummary />;
};

export const Route = createFileRoute("/_auth/_admin/reports-summary/")({
  component: ReportsSummaryList,
});
