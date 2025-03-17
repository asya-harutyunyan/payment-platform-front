import { httpClient } from "@/common/api";
import { messaging } from "@/common/firebase";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setNotificationData,
  updateDepositAdminStatus,
} from "@/store/reducers/user-info/depositSlice";
import { getToken, MessagePayload, onMessage } from "firebase/messaging";
import { useEffect } from "react";

export const useNotifications = () => {
  const { deposit } = useAppSelector((state) => state.deposit);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const initialize = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      const localToken = localStorage.getItem("notification_token");
      if (token && token !== localToken) {
        // console.log("Token generated:", token);
        httpClient
          .post("save-fcm-token", {
            fcm_token: token,
          })
          .then(() => {
            localStorage.setItem("notification_token", token);
          });
        // Send this token to your server to store it for later use
      } else {
        console.log("No registration token available.");
      }
    } catch (err) {
      console.error("Error getting token:", err);
    }
  };

  const handleNotification = (payload: MessagePayload) => {
    if (
      payload?.data?.id &&
      deposit?.id === +payload?.data?.id &&
      user?.role !== "admin"
    ) {
      dispatch(updateDepositAdminStatus(payload.data.status));
    }
    if (payload.data?.order && user?.role !== "admin") {
      dispatch(setNotificationData(payload.data));
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, handleNotification);

    return () => {
      unsubscribe();
    };
  }, [deposit]);

  return { initialize };
};
