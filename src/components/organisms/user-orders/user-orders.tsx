import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getOrdersThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const UserOrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrdersThunk({ page: page }));
  }, []);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getOrdersThunk({ page }));
  };
  const columns = useMemo(
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
      <TaskHeader title={t("orders")} />
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
              data={orders}
              onChangePage={onChangePage}
            />

            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              {" "}
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
    </Box>
  );
};
