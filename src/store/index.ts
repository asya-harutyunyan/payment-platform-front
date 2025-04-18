import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { webSocketMiddleware } from "./middleware/websocket.middleware";
import walletSlice from "./reducers/admin/walletSlice";
import authSlice from "./reducers/auth/authSlice";
import bankDetailsSlice from "./reducers/user-info/bankDetailsSlice";
import depositSlice from "./reducers/user-info/depositSlice";
import reportSlice from "./reducers/user-info/reportSlice";
import usersSlice from "./reducers/usersSlice";
import websocketSlice from "./reducers/websocket";

const rootReducer = combineReducers({
  auth: authSlice,
  deposit: depositSlice,
  users: usersSlice,
  wallet: walletSlice,
  websocket: websocketSlice,
  bankDetails: bankDetailsSlice,
  reports: reportSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(webSocketMiddleware.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
