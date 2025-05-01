import { ReportsProccesedAmount } from "@/components/organisms/reports-processed";
import { createFileRoute } from "@tanstack/react-router";

const ReportsProcesedAmountList = () => {
  return <ReportsProccesedAmount />;
};

export const Route = createFileRoute("/_auth/_admin/reports-processed-amount/")(
  {
    component: ReportsProcesedAmountList,
  }
);
