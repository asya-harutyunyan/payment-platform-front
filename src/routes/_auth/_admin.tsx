import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Echo from "laravel-echo";
import { useEffect } from "react";

const AdminLayout = () => {
  useEffect(() => {
    // window.Pusher = Pusher;

    window.Echo = new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
      wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
    });
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
