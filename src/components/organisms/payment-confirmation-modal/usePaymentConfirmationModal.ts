import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";

export const usePaymentConfirmationModal = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const { notificationData } = useAppSelector((state) => state.deposit);

  const close = () => {
    setOpened(false);
  };

  useEffect(() => {
    if (notificationData) {
      setOpened(true);
    }
  }, [notificationData]);

  return {
    opened,
    close,
    data: notificationData,
  };
};
