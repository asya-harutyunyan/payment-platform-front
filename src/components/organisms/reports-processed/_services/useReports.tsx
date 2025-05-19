import { useAppDispatch, useAppSelector } from "@/store";
import { getProcessedAmountsThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { useEffect, useState } from "react";

const useReports = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");

  const { total, loading, admingetProcessedAmounts } = useAppSelector(
    (state) => state.reports
  );
  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  useEffect(() => {
    dispatch(getProcessedAmountsThunk());
  }, []);

  return {
    total,
    loading,
    orders_stats,
    totalDeposits,
    loadingDeposits,
    report_users,
    adminSummary,
    dispatch,
    page,
    setPage,

    value,
    setValue,
    sort,
    setSort,
    admingetProcessedAmounts,
  };
};

export default useReports;
