import Echo from "laravel-echo";
import Pusher, { Channel } from "pusher-js";

class SocketConnection {
  public ws: Echo<"reverb">;

  constructor() {
    this.ws = new Echo({
      broadcaster: "reverb",
      Pusher,
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
      wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
      autoConnect: false,
      authorizer: (channel: Channel) => {
        return {
          authorize: (
            socketId: string,
            callback: (authorized: boolean, response: string) => void
          ) => {
            fetch(`/broadcasting/auth`, {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
  }
}

export const socketConnection = new SocketConnection();
