import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
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

  const columns = useMemo<IColumn[]>(
    () => [
      {
        column: "address",
        valueKey: "processing_amount",
      },
      {
        column: "currency",
        valueKey: "wallet.currency",
      },
      {
        column: "network",
        valueKey: "wallet.network",
      },
      {
        column: "qr_code",
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
      ) : deposits.length > 0 ? (
        <Box
          sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
        >
          <DynamicTable
            isUser
            columns={columns}
            data={deposits}
            onChangePage={onChangePage}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              page={page}
              onPageChange={onChangePage}
              count={total}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </Box>
  );
};
