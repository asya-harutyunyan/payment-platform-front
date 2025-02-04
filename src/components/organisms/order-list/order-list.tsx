import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getOrdersThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const OrderListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, loading } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrdersThunk({ page: page }));
  }, []);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getOrdersThunk({ page }));
    console.log(event, page);
  };
  const columns = useMemo<IColumn[]>(
    () => [
      {
        column: "amount",
        valueKey: "amount",
      },
      {
        column: "status_by_admin",
        valueKey: "status_by_admin",
      },
      {
        column: "status_by_client",
        valueKey: "status_by_client",
      },
    ],
    []
  );
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("order_list")} />
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
          overflowX: "auto",
        }}
      >
        {loading ? (
          <CircularIndeterminate />
        ) : orders.length > 0 ? (
          <Box
            sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
          >
            <DynamicTable
              isUser
              columns={columns}
              data={orders as unknown as Record<string, ReactNode>[]}
              onChangePage={onChangePage}
            />

            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              {" "}
              <PaginationOutlined onPageChange={onChangePage} count={total} />
            </Box>
          </Box>
        ) : (
          <EmptyComponent />
        )}
      </Box>
    </Box>
  );
};
