import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";

const useReports = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  return {
    orders_stats,
    totalDeposits,
    loadingDeposits,
    report_users,
    adminSummary,
    dispatch,
    value,
    setValue,
    sort,
    setSort,
  };
};

export default useReports;
