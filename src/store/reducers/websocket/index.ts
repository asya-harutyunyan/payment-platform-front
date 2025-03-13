import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWebsocketState, typeConnect } from "./entities";

const initialState: IWebsocketState = {
  connect: typeConnect.Disconnected,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connect: (_state, _action: PayloadAction<number>) => {

    },
    disconnect: (state) => {
      state.connect = typeConnect.Disconnected;
    },
  },
});

export const { connect, disconnect } = websocketSlice.actions;

export default websocketSlice.reducer;
