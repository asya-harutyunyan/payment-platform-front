import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { platipayThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { EmptyComponent } from "../empty-component";
import usePlatipayService from "./_services/usePlatipayService";

export const PlatiPay: FC = () => {
  const {
    dispatch,
    platipay,
    total,
    loading,
    page,
    user,
    onChangePage,
    columns,
  } = usePlatipayService();

  useEffect(() => {
    dispatch(platipayThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("platipay")} />
      {loading ? (
        <CircularIndeterminate />
      ) : platipay.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={platipay} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
