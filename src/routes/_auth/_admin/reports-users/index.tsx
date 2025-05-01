import { ReportsUsers } from "@/components/organisms/reports-users";
import { createFileRoute } from "@tanstack/react-router";

const ReportsSummaryList = () => {
  return <ReportsUsers />;
};

export const Route = createFileRoute("/_auth/_admin/reports-users/")({
  component: ReportsSummaryList,
});
