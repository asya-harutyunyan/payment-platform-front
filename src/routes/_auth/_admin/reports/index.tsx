import { Reports } from "@/components/organisms/reports/reports";
import { createFileRoute } from "@tanstack/react-router";

const ReportsList = () => {
  return <Reports />;
};

export const Route = createFileRoute("/_auth/_admin/reports/")({
  component: ReportsList,
});
