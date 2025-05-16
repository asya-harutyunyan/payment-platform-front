import { useAppDispatch, useAppSelector } from "@/store";
import { GetPlatformXThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useEffect, useState } from "react";

type FormData = z.infer<typeof add_wallet_schema>;

const useReports = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const { newRegisteredUsers, total, loading } = useAppSelector(
    (state) => state.reports
  );

  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(add_wallet_schema),
    defaultValues: {
      address: "",
      network: "",
      currency: "",
      from: undefined,
      to: undefined,
    },
  });

  const {
    orders_stats,
    total: totalDeposits,
    loading: loadingDeposits,
    report_users,
    adminSummary,
  } = useAppSelector((state) => state.reports);

  useEffect(() => {
    dispatch(
      GetPlatformXThunk({
        page: 1,
        per_page: 20,
        from: "",
        to: "",
      })
    );
  }, []);

  return {
    newRegisteredUsers,
    total,
    loading,
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
