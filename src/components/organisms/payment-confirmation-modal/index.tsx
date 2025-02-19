import bg from "@/assets/images/modal.png";
import { BasicModal } from "@/components/atoms/modal";
import { Box } from "@mui/material";
import { FC } from "react";
import { usePaymentConfirmationModal } from "./usePaymentConfirmationModal";

export const PaymentPlatformModal: FC = () => {
  const { opened, close, data } = usePaymentConfirmationModal();
  return (
    <BasicModal open={opened} handleClose={close} width="500px" bg={bg}>
      <Box>
        <h1 style={{ color: "#fff" }}>Payment Details</h1>
        <p style={{ color: "#fff" }}>Order ID: {data?.order?.order_id}</p>
        <p style={{ color: "#fff" }}>
          Order Create At: {data?.order?.created_at}
        </p>
        <p style={{ color: "#fff" }}>Order User ID: {data?.order?.user_id}</p>
      </Box>
    </BasicModal>
  );
};
