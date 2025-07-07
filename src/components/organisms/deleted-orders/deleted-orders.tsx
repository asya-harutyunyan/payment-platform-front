import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useDeletedOrders from "./_services/useDeletedOrders";
export const DeletedOrdersComponent: FC = () => {
  const { deletedOrders, total, loading, page, onChangePage, columns } =
    useDeletedOrders();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("deleted_orders_list")} width="100%" />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <>
            <DynamicTable columns={columns} data={deletedOrders} />
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </>
        </Box>
      )}
    </Box>
  );
};
