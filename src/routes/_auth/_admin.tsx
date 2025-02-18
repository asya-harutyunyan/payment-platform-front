import { socketConnection } from "@/common/socket";
import { useAuth } from "@/context/auth.context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      socketConnection.ws.connect();
      socketConnection.ws
        .private(`App.User.${user.id}`)
        .notification((notification: unknown) => {
          console.log(notification);
        });
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/_auth/_admin")({
  beforeLoad: async () => {
    const role = localStorage.getItem("user_role");
    if (role !== "admin") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AdminLayout,
});
