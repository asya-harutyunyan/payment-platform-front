import bg from "@/assets/images/modal.png";
import { BasicModal } from "@/components/atoms/modal";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useOrdersForRefound from "./_services/use-orders-for-refound";

export const OrdersForRefoundPage: FC = () => {
  const {
    columns,
    user,
    referralOrdersData,
    currentOrdersData,
    onModalClose,
    ordersColumns,
  } = useOrdersForRefound();

  return (
    <Box sx={{ width: "100%" }}>
      {user?.permissions.includes("orders_view.summary") && (
        <TaskHeader title={t("orders_for_refound")} width="100%" color="#fff" />
      )}
      <Box sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}>
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
          }}
        >
          <DynamicTable columns={columns} data={referralOrdersData} />
        </Box>
      </Box>
      <BasicModal
        handleClose={onModalClose}
        open={!!currentOrdersData.data.length}
        bg={bg}
        width="50%"
        style={{
          padding: "50px",
        }}
      >
        <DynamicTable columns={ordersColumns} data={currentOrdersData.data} />
      </BasicModal>
    </Box>
  );
};
