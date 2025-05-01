import { ReportsNewUsers } from "@/components/organisms/reports-new-reg-users/reports";
import { createFileRoute } from "@tanstack/react-router";

const ReportsList = () => {
  return <ReportsNewUsers />;
};

export const Route = createFileRoute("/_auth/_admin/reports-new-users/")({
  component: ReportsList,
});
