import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import walletSlice from "./admin/walletSlice";
import authSlice from "./auth/authSlice";
import depositSlice from "./user-info/depositSlice";
import usersSlice from "./usersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  deposit: depositSlice,
  users: usersSlice,
  wallet: walletSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
