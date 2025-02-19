import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { DataDeposits } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const DepositLists: FC = () => {
  const dispatch = useAppDispatch();
  const { deposits, total, loading } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getDepositsThunk({ page: page }));
  }, []);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getDepositsThunk({ page: page }));
    console.log(event, page);
  };

  const columns = useMemo<IColumn<DataDeposits>[]>(
    () => [
      {
        column: "name",
        valueKey: "user.name",
      },
      {
        column: "surname",
        valueKey: "user.surname",
      },
      {
        column: "processing_amount",
        valueKey: "processing_amount",
      },
      {
        column: "status",
        valueKey: "final_status",
      },
    ],
    []
  );
  return (
    <Box>
      <TaskHeader title={t("deposit_lists")} />
      {loading ? (
        <CircularIndeterminate />
      ) : total > 0 ? (
        <Box
          sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
        >
          <DynamicTable
            isUser
            isNeedBtn
            columns={columns}
            data={deposits}
            onChangePage={onChangePage}
          />

          {total > 4 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                page={page}
                onPageChange={onChangePage}
                count={total}
              />
            </Box>
          )}
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </Box>
  );
};
