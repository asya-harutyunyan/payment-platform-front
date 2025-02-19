import Echo from "laravel-echo";

export interface IWebsocketState {
  connect: typeConnect;
  client?: Echo<"reverb">;
}

export enum typeConnect {
  Disconnected,
  Connected,
}
