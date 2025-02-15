import { useAuth } from "@/context/auth.context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Echo from "laravel-echo";
import Pusher, { Channel } from "pusher-js";
import { useEffect } from "react";

const UserLayout = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const echo = new Echo({
        broadcaster: "reverb",
        Pusher,
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
        authorizer: (channel: Channel) => {
          return {
            authorize: (
              socketId: string,
              callback: (authorized: boolean, response: string) => void
            ) => {
              fetch(`${import.meta.env.VITE_BASE_API_URL}/broadcasting/auth`, {
                method: "POST",
                mode: "cors",
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
      echo
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

export const Route = createFileRoute("/_auth/_user")({
  beforeLoad: () => {
    const role = localStorage.getItem("user_role");
    if (role !== "client") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: UserLayout,
});
