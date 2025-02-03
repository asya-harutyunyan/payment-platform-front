import { useAuth } from "@/context/auth.context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect } from "react";

window.Pusher = Pusher;

const AdminLayout = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      window.Echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              fetch(import.meta.env.VITE_BASE_API_URL + "/broadcasting/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                  socket_id: socketId,
                  channel_name: channel.name,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  callback(false, data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
        enabledTransports: ["ws", "wss"],
      });
      window.Echo.private(`App.User.${user.id}`).notification(
        (notification) => {
          console.log(notification);
        }
      );
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
